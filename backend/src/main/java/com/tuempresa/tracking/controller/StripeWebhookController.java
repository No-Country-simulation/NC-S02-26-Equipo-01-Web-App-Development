package com.tuempresa.tracking.controller;

import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.tuempresa.tracking.repository.TransactionRepository;
import com.tuempresa.tracking.service.integration.GoogleAdsService;
import com.tuempresa.tracking.service.integration.MetaCapiService;
import com.tuempresa.tracking.service.integration.PipedriveCRMServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/v1/stripe")
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private GoogleAdsService googleAdsService;

    @Autowired
    private MetaCapiService metaCapiService;

    @Autowired
    private PipedriveCRMServiceImpl pipedriveService;

    private static final Logger log = LoggerFactory.getLogger(StripeWebhookController.class);
    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            log.info("Webhook recibido. Tipo: {} | EventID: {}", event.getType(), event.getId());

            if ("checkout.session.completed".equals(event.getType())) {

                EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
                StripeObject stripeObject = null;

                if (dataObjectDeserializer.getObject().isPresent()) {
                    stripeObject = dataObjectDeserializer.getObject().get();
                    log.debug("Objeto deserializado: {}", stripeObject.getClass().getSimpleName());
                } else {
                    log.error("No se pudo deserializar el objeto del evento. Posible mismatch de versión Stripe API.");
                }

                if (stripeObject instanceof Session session) {
                    log.info("Procesando checkout session: {}", session.getId());
                    procesarPagoAcelerado(session);
                }

                return ResponseEntity.ok("Success: Processed");
            }

            return ResponseEntity.ok("Success: Event ignored");

        } catch (Exception e) {
            log.error("Error procesando webhook Stripe", e);
            return ResponseEntity.badRequest().body("Webhook error");
        }
    }

    private void procesarPagoAcelerado(Session session) {

        String sessionId = session.getId();
        String customerEmail = (session.getCustomerDetails() != null) ? session.getCustomerDetails().getEmail()
                : "no-email@test.com";

        double amount = (session.getAmountTotal() != null) ? session.getAmountTotal() / 100.0 : 0.0;

        String gclid = (session.getMetadata() != null) ? session.getMetadata().get("gclid") : null;

        String fbclid = (session.getMetadata() != null) ? session.getMetadata().get("fbclid") : null;

        int updated = transactionRepository.markAsPaidIfPending(sessionId, customerEmail);

        log.info("Intentando marcar transacción {} como PAID | filas afectadas={} | email={} | gclid={} | fbclid={}", sessionId, updated, customerEmail, gclid, fbclid);

        if (updated == 1) {

            log.info("Transacción {} marcada como PAID correctamente", sessionId);

            try {
                pipedriveService.registrarVenta(customerEmail, amount);
                log.info("Venta registrada en Pipedrive para {}", customerEmail);
            } catch (Exception e) {
                log.error("Error enviando venta a Pipedrive", e);
            }

            CompletableFuture<Void> googleFuture = CompletableFuture.runAsync(() -> {

                log.info("Iniciando worker de marketing para {}", customerEmail);

                try {
                    if (gclid != null && !gclid.isBlank()) {

                        googleAdsService.sendOfflineConversion(gclid, amount);
                        log.info("Conversión enviada a Google Ads");

                    } else {
                        log.debug("No hay GCLID, se omite envío a Google Ads");
                    }

                } catch (Exception e) {
                    log.error("Error enviando conversión a Google Ads", e);
                }

            });

            CompletableFuture<Void> metaFuture = CompletableFuture.runAsync(() -> {

                try {

                    if (fbclid != null && !fbclid.isBlank()) {
                        metaCapiService.sendPurchaseEvent(customerEmail, amount, fbclid);
                        log.info("Evento enviado a Meta CAPI");
                    }

                } catch (Exception e) {
                    log.error("Error enviando evento a Meta CAPI", e);
                }

            });

            CompletableFuture.allOf(googleFuture, metaFuture).thenRun(() -> log.info("Procesamiento async finalizado para {}", sessionId));

        } else {
            log.warn("No se actualizó la transacción {}. Puede que no exista o ya esté en estado PAID", sessionId);
        }
    }
}