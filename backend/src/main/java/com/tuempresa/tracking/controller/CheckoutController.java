package com.tuempresa.tracking.controller;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.tuempresa.tracking.dto.CheckoutRequest;
import com.tuempresa.tracking.model.Transaction;
import com.tuempresa.tracking.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/checkout")
@CrossOrigin(origins = "*")
public class CheckoutController {

    private static final Logger log = LoggerFactory.getLogger(CheckoutController.class);

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Autowired
    private TransactionRepository transactionRepository;

    @PostMapping("/create-session")
    public ResponseEntity<Map<String, String>> createSession(@RequestBody CheckoutRequest request) throws Exception {

        try {

            Stripe.apiKey = stripeApiKey;

            log.info("Creating checkout session for productId={}", request.productId());

            // 1. Validación
            if (request.productId() == null || request.productId().isBlank()) {
                log.warn("Checkout request rejected: missing productId");
                return ResponseEntity.badRequest().body(Map.of("error", "productId is required"));
            }

            // 2. Configuración sesión
            SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                    .setSuccessUrl(request.successUrl() + "?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(request.cancelUrl());

            // 3. Metadata
            paramsBuilder.putMetadata("productId", request.productId());
            putIfValid(paramsBuilder, "gclid", request.gclid());
            putIfValid(paramsBuilder, "fbclid", request.fbclid());
            putIfValid(paramsBuilder, "campaign", request.campaign());
            putIfValid(paramsBuilder, "source", request.source());

            // 4. Line items
            addPlanItems(paramsBuilder, request.productId());

            // 5. Crear sesión Stripe
            Session session = Session.create(paramsBuilder.build());

            log.info("Stripe session created sessionId={} product={}", session.getId(), request.productId());

            // 6. Persistencia
            Transaction transaction = new Transaction();
            transaction.setStripeSessionId(session.getId());
            transaction.setPlan(request.productId());
            transaction.setGclid(request.gclid());
            transaction.setFbclid(request.fbclid());
            transaction.setCampaign(request.campaign());
            transaction.setSource(request.source());
            transaction.setStatus("PENDING");

            transactionRepository.save(transaction);

            log.info("Transaction persisted sessionId={} status=PENDING", session.getId());

            // 7. Response
            Map<String, String> response = new HashMap<>();
            response.put("sessionId", session.getId());
            response.put("url", session.getUrl());

            log.info("Checkout ready sessionId={} redirectUrlGenerated=true", session.getId());

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {

            log.warn("Checkout validation error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));

        } catch (Exception e) {

            log.error("Stripe session creation failed", e);
            return ResponseEntity.internalServerError().body(Map.of("error", "Stripe session creation failed"));
        }
    }

    private void addPlanItems(SessionCreateParams.Builder builder, String productId) {

        if ("STARTER".equalsIgnoreCase(productId)) {

            builder.addLineItem(createItem("price_1T6dFw12wkAy9LpKpUuYiTr6"));
            builder.addLineItem(createItem("price_1T6dEI12wkAy9LpKRDjBgWch"));

            log.debug("Plan STARTER items added");

        } else if ("GROWTH".equalsIgnoreCase(productId)) {

            builder.addLineItem(createItem("price_1T6dSA12wkAy9LpKMAd2EJYO"));
            builder.addLineItem(createItem("price_1T6dRe12wkAy9LpKWKXjLgYO"));

            log.debug("Plan GROWTH items added");

        } else {

            log.error("Unknown plan requested: {}", productId);
            throw new IllegalArgumentException("Plan no reconocido: " + productId);
        }
    }
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<?> getSession(@PathVariable String sessionId) {

        try {
            if (sessionId == null || sessionId.isBlank()) {
                log.warn("Session lookup rejected: empty sessionId");
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "sessionId is required"));
            }

            Stripe.apiKey = stripeApiKey;
            log.info("Fetching Stripe session {}", sessionId);

            Session session = Session.retrieve(sessionId);

            if (session == null) {
                log.warn("Stripe session not found id={}", sessionId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Session not found"));
            }

            Map<String, Object> response = Map.of(
                    "id", session.getId(),
                    "email", session.getCustomerDetails() != null
                            ? session.getCustomerDetails().getEmail()
                            : null,
                    "amount", session.getAmountTotal() != null
                            ? session.getAmountTotal() / 100.0
                            : 0.0,
                    "status", session.getPaymentStatus());

            log.debug("Stripe session retrieved id={} status={}", session.getId(), session.getPaymentStatus());

            return ResponseEntity.ok(response);

        } catch (com.stripe.exception.InvalidRequestException e) {
            log.warn("Stripe session invalid request id={} message={}", sessionId, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Session not found"));
        } catch (Exception e) {
            log.error("Unexpected error retrieving Stripe session id={}", sessionId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to retrieve session"));
        }
    }

    private SessionCreateParams.LineItem createItem(String priceId) {
        return SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPrice(priceId)
                .build();
    }

    private void putIfValid(SessionCreateParams.Builder builder, String key, String value) {
        if (value != null && !value.isBlank() && value.length() <= 255) {
            builder.putMetadata(key, value);
            log.debug("Metadata added key={}", key);
        }
    }
}