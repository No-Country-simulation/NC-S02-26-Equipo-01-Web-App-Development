package com.tuempresa.tracking.controller;

import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.tuempresa.tracking.service.TrackingRouterService;
import com.tuempresa.tracking.service.integration.CRMIntegrationService;
import com.tuempresa.tracking.service.integration.MetaCapiService; 
import com.tuempresa.tracking.service.integration.GoogleAdsService;
import org.springframework.beans.factory.annotation.Value; // Import para el secreto
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/webhooks")
public class StripeWebhookController {

    private final TrackingRouterService trackingService;
    private final CRMIntegrationService crmService;
    private final MetaCapiService metaCapiService; 
    private final GoogleAdsService googleAdsService;

    @Value("${stripe.webhook.secret}") // Sacamos el secreto del application.properties
    private String endpointSecret;

    public StripeWebhookController(TrackingRouterService trackingService, 
                                   CRMIntegrationService crmService,
                                   MetaCapiService metaCapiService,
                                   GoogleAdsService googleAdsService) {
        this.trackingService = trackingService;
        this.crmService = crmService;
        this.metaCapiService = metaCapiService;
        this.googleAdsService = googleAdsService;
    }

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            // Validación de integridad del evento
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            
            System.out.println(">>> [SRE MONITOR] Señal recibida: " + event.getType());

            // 1. El router procesa el evento genérico
            trackingService.routeEvent(event);

            // 2. Lógica específica para ventas completadas
            if ("checkout.session.completed".equals(event.getType())) {
                System.out.println(">>> [SRE INFO] 🎯 Venta confirmada. Iniciando pipeline de atribución...");

                Session session = (Session) event.getDataObjectDeserializer().deserializeUnsafe();

                if (session != null) {
                    // Extraemos metadata inyectada por nuestro CheckoutController
                    Map<String, String> metadata = session.getMetadata();
                    String email = (session.getCustomerDetails() != null) ? session.getCustomerDetails().getEmail() : "cliente_anonimo@test.com";
                    double amount = (session.getAmountTotal() != null) ? session.getAmountTotal() / 100.0 : 0.0;

                    System.out.println(">>> [SRE DEBUG] Procesando: " + email + " | Monto: $" + amount);
                    
                    // --- ORQUESTACIÓN BACKEND-ONLY ---
                    
                    // A. Registro en Pipedrive
                    crmService.registrarVenta(email, amount);

                    // B. Atribución en Meta CAPI
                    if (metadata != null) {
                        String fbclid = metadata.get("fbclid");

                        if (email != null){
                            metaCapiService.sendPurchaseEvent(email, amount, fbclid);
                        }
                    }

                    // C. Atribución en Google Ads (Usando el GCLID de la metadata)
                    if (metadata != null && metadata.containsKey("gclid")) {
                        String gclid = metadata.get("gclid");
                        System.out.println(">>> [SRE SUCCESS] GCLID detectado: " + gclid + ". Enviando a Google Ads...");
                        googleAdsService.sendOfflineConversion(gclid, amount);
                    } else {
                        System.out.println(">>> [SRE WARN] No se detectó GCLID en la metadata de la sesión.");
                    }

                } else {
                    System.err.println(">>> [SRE ERROR] No se pudo deserializar la sesión de Stripe.");
                    return ResponseEntity.badRequest().build();
                }
            }
            
            return ResponseEntity.ok("ACK");
        } catch (Exception e) {
            System.err.println(">>> [SRE ERROR] Error procesando webhook: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}