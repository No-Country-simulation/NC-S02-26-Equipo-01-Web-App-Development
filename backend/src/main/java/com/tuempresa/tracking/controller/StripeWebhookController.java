package com.tuempresa.tracking.controller;

import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.tuempresa.tracking.model.Transaction;
import com.tuempresa.tracking.repository.TransactionRepository;
import com.tuempresa.tracking.service.integration.GoogleAdsService;
import com.tuempresa.tracking.service.integration.MetaCapiService;
import com.tuempresa.tracking.service.integration.PipedriveCRMServiceImpl; // Importación clave
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
    private PipedriveCRMServiceImpl pipedriveService; // Inyectamos el servicio que me pasaste

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Webhook Error: " + e.getMessage());
        }

        if ("checkout.session.completed".equals(event.getType())) {
            Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
            if (session != null) {
                handleSuccessfulPayment(session);
            }
        }
        return ResponseEntity.ok("Success");
    }

    private void handleSuccessfulPayment(Session session) {
        String sessionId = session.getId();
        Optional<Transaction> transactionOpt = transactionRepository.findByStripeSessionId(sessionId);

        if (transactionOpt.isPresent()) {
            Transaction transaction = transactionOpt.get();
            transaction.setStatus("PAID");
            transactionRepository.save(transaction);

            // 1. Extraemos datos
            String gclid = session.getMetadata().get("gclid");
            String fbclid = session.getMetadata().get("fbclid");
            String customerEmail = session.getCustomerDetails() != null ? session.getCustomerDetails().getEmail() : "no-email@test.com";
            double amount = session.getAmountTotal() / 100.0;

            // 2. DISPARO A GOOGLE ADS
            if (gclid != null && !gclid.isBlank()) {
                googleAdsService.sendOfflineConversion(gclid, amount);
                System.out.println(">>> [ADS SUCCESS] Enviado: " + gclid);
            }

            // 3. DISPARO A META CAPI
            if (fbclid != null && !fbclid.isBlank()) {
                metaCapiService.sendPurchaseEvent(customerEmail, amount, fbclid);
                System.out.println(">>> [META SUCCESS] Enviado: " + fbclid);
            }

            // 4. REGISTRO EN PIPEDRIVE (¡Nuevo!)
            try {
                pipedriveService.registrarVenta(customerEmail, amount);
                System.out.println(">>> [PIPEDRIVE SUCCESS] Venta registrada para: " + customerEmail);
            } catch (Exception e) {
                System.err.println(">>> [PIPEDRIVE ERROR] Falló el registro: " + e.getMessage());
            }
            
            System.out.println(">>> [SRE TOTAL SUCCESS] Ciclo completo para sesión: " + sessionId);
        }
    }
}