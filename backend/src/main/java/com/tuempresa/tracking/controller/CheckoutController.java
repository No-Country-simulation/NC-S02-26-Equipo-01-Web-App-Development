package com.tuempresa.tracking.controller;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.tuempresa.tracking.dto.CheckoutRequest;
import com.tuempresa.tracking.model.Transaction;
import com.tuempresa.tracking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/checkout")
@CrossOrigin(origins = "*") 
public class CheckoutController {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Autowired
    private TransactionRepository transactionRepository;

    @PostMapping("/create-session")
    public ResponseEntity<Map<String, String>> createSession(@RequestBody CheckoutRequest request) throws Exception {
        try {
            Stripe.apiKey = stripeApiKey;

            // 1. Validaciones básicas
            if (request.productId() == null || request.productId().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "productId is required"));
            }

            // 2. Configuración de la sesión en modo SUBSCRIPTION (Lógica de Setup Fee + Mensualidad)
            SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION) 
                .setSuccessUrl(request.successUrl() + "?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(request.cancelUrl());

            // 3. Metadata extendida para Atribución (Google Ads + Meta + Campañas)
            paramsBuilder.putMetadata("productId", request.productId());
            putIfValid(paramsBuilder, "gclid", request.gclid());
            putIfValid(paramsBuilder, "fbclid", request.fbclid());
            putIfValid(paramsBuilder, "campaign", request.campaign());
            putIfValid(paramsBuilder, "source", request.source());

            // 4. Inyección de IDs Reales de Stripe según el plan (Starter/Growth)
            addPlanItems(paramsBuilder, request.productId());

            // 5. Creación de la sesión en Stripe
            Session session = Session.create(paramsBuilder.build());

            // 6. PERSISTENCIA EN NEON DB (SRE Tracking)
            Transaction transaction = new Transaction();
            transaction.setStripeSessionId(session.getId());
            transaction.setPlan(request.productId());
            transaction.setGclid(request.gclid());
            transaction.setStatus("PENDING");
            transactionRepository.save(transaction);

            // 7. Respuesta para el Frontend
            Map<String, String> response = new HashMap<>();
            response.put("sessionId", session.getId());
            response.put("url", session.getUrl()); 
            
            System.out.println(">>> [SRE SUCCESS] Checkout " + request.productId() + " generado. Session: " + session.getId());
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Stripe session creation failed"));
        }
    }

    private void addPlanItems(SessionCreateParams.Builder builder, String productId) {
        if ("STARTER".equalsIgnoreCase(productId)) {
            // Setup Fee ($499 puntual) + Monthly Fee ($150 mensual)
            builder.addLineItem(createItem("price_1T6dFw12wkAy9LpKpUuYiTr6")); 
            builder.addLineItem(createItem("price_1T6dEI12wkAy9LpKRDjBgWch"));
        } else if ("GROWTH".equalsIgnoreCase(productId)) {
            // Setup Fee ($899 puntual) + Monthly Fee ($299 mensual)
            builder.addLineItem(createItem("price_1T6dSA12wkAy9LpKMAd2EJYO")); 
            builder.addLineItem(createItem("price_1T6dRe12wkAy9LpKWKXjLgYO"));
        } else {
            throw new IllegalArgumentException("Plan no reconocido: " + productId);
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
        }
    }
}