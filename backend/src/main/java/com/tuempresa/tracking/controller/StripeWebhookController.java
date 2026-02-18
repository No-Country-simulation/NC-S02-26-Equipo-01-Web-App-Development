package com.tuempresa.tracking.controller;

import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.tuempresa.tracking.service.TrackingRouterService;
import com.tuempresa.tracking.service.integration.CRMIntegrationService;
import com.tuempresa.tracking.service.integration.MetaCapiService; 
import com.tuempresa.tracking.service.integration.GoogleAdsService; // 1. IMPORT DE GOOGLE ADS
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map; // 2. IMPORT PARA LEER METADATOS

@RestController
@RequestMapping("/api/v1/webhooks")
public class StripeWebhookController {

    private final TrackingRouterService trackingService;
    private final CRMIntegrationService crmService;
    private final MetaCapiService metaCapiService; 
    private final GoogleAdsService googleAdsService; // 3. NUEVA DEPENDENCIA
    private final String endpointSecret = "whsec_1f72d28df2d2bf76dc9f7f815e48d88eca44c9bce13f15dc28ae8f21a375cd2f";

    // 4. ACTUALIZAR CONSTRUCTOR
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
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            
            System.out.println(">>> [SRE MONITOR] Recibido: " + event.getType() + " | ID: " + event.getId());

            trackingService.routeEvent(event);

            if ("checkout.session.completed".equals(event.getType())) {
                System.out.println(">>> [SRE MONITOR] 🎯 ¡EVENTO DETECTADO! Intentando lectura forzada...");

                Session session = (Session) event.getDataObjectDeserializer().deserializeUnsafe();

                if (session != null) {
                    String email = (session.getCustomerDetails() != null) ? session.getCustomerDetails().getEmail() : session.getCustomerEmail();
                    if (email == null) email = "test_sre_fallback@tuempresa.com";

                    double amount = (session.getAmountTotal() != null) ? session.getAmountTotal() / 100.0 : 0.0;
                    
                    System.out.println(">>> [SRE DEBUG] Datos extraídos: " + email + " | $" + amount);
                    
                    // 1. Registro en Pipedrive (TU CÓDIGO INTACTO)
                    System.out.println(">>> [SRE DEBUG] Enviando a Pipedrive...");
                    crmService.registrarVenta(email, amount);

                    // 2. Envío a Meta CAPI (TU CÓDIGO INTACTO)
                    System.out.println(">>> [SRE DEBUG] Enviando conversión a Meta CAPI...");
                    metaCapiService.sendPurchaseEvent(email, amount);

                    // 3. Envío a Google Ads extrayendo el GCLID
                    System.out.println(">>> [SRE DEBUG] Enviando conversión a Google Ads...");
                    Map<String, String> metadata = session.getMetadata();
                    if (metadata != null && metadata.containsKey("gclid")) {
                        googleAdsService.sendOfflineConversion(metadata.get("gclid"), amount);
                    } else {
                        System.out.println(">>> [SRE WARN] No se encontró GCLID en los metadatos. Se omite Google Ads.");
                    }

                } else {
                    System.err.println(">>> [SRE ERROR] Fallo crítico: La sesión sigue siendo NULL incluso con unsafe.");
                }
            }
            
            return ResponseEntity.ok("Procesado");
        } catch (Exception e) {
            System.err.println(">>> [SRE ERROR] Falla crítica en Webhook: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}