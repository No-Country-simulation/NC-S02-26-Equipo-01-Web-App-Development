package com.tuempresa.tracking.controller;

import com.stripe.exception.EventDataObjectDeserializationException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.tuempresa.tracking.repository.TransactionRepository;
import com.tuempresa.tracking.service.TrackingRouterService;
import com.tuempresa.tracking.service.integration.CRMIntegrationService;
import com.tuempresa.tracking.service.integration.MetaCapiService; 
import com.tuempresa.tracking.service.integration.GoogleAdsService;
import org.springframework.beans.factory.annotation.Value;
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
    private final TransactionRepository transactionRepository;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    public StripeWebhookController(TrackingRouterService trackingService, 
                                   CRMIntegrationService crmService,
                                   MetaCapiService metaCapiService,
                                   GoogleAdsService googleAdsService,
                                   TransactionRepository transactionRepository) {
        this.trackingService = trackingService;
        this.crmService = crmService;
        this.metaCapiService = metaCapiService;
        this.googleAdsService = googleAdsService;
        this.transactionRepository = transactionRepository;
    }

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            System.out.println(">>> [SRE MONITOR] Señal recibida: " + event.getType());

            trackingService.routeEvent(event);

            if ("checkout.session.completed".equals(event.getType())) {
                handleSuccess(event);
            } 
            else if ("checkout.session.async_payment_failed".equals(event.getType())) {
                handleFailure(event);
            }
            
            return ResponseEntity.ok("ACK");
        } catch (Exception e) {
            System.err.println(">>> [SRE ERROR] Webhook fallido: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // --- AGREGADO EL THROWS AQUÍ ---
    private void handleSuccess(Event event) throws EventDataObjectDeserializationException {
        Session session = (Session) event.getDataObjectDeserializer().deserializeUnsafe();
        if (session == null) return;

        String sessionId = session.getId();
        String email = (session.getCustomerDetails() != null) ? session.getCustomerDetails().getEmail() : "anonimo";
        double amount = (session.getAmountTotal() != null) ? session.getAmountTotal() / 100.0 : 0.0;

        transactionRepository.findByStripeSessionId(sessionId).ifPresent(t -> {
            t.setStatus("PAID");
            t.setEmail(email);
            transactionRepository.save(t);
            System.out.println(">>> [SRE DB] Transacción " + sessionId + " marcada como PAID.");
        });

        crmService.registrarVenta(email, amount);
        metaCapiService.sendPurchaseEvent(email, amount);

        Map<String, String> metadata = session.getMetadata();
        if (metadata != null && metadata.containsKey("gclid")) {
            googleAdsService.sendOfflineConversion(metadata.get("gclid"), amount);
        }
    }

    // --- AGREGADO EL THROWS AQUÍ ---
    private void handleFailure(Event event) throws EventDataObjectDeserializationException {
        Session session = (Session) event.getDataObjectDeserializer().deserializeUnsafe();
        if (session == null) return;

        transactionRepository.findByStripeSessionId(session.getId()).ifPresent(t -> {
            t.setStatus("FAILED");
            transactionRepository.save(t);
            System.err.println(">>> [SRE ALERT] Pago fallido para sesión: " + session.getId());
        });
    }
}