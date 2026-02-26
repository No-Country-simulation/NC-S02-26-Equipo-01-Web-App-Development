package com.tuempresa.tracking.controller;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.tuempresa.tracking.dto.CheckoutRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/checkout")
public class CheckoutController {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostMapping("/create-session")
    public ResponseEntity<Map<String, String>> createSession(@RequestBody CheckoutRequest request) throws Exception {
        try {
        Stripe.apiKey = stripeApiKey;

        if (request.productId() == null || request.productId().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "productId is required"));
        }

        // 1. Resolvemos el ID de Stripe según el productId recibido
        String stripePriceId = resolvePriceId(request.productId());

        // 2. Construimos la metadata para la trazabilidad (Atribución)
        Map<String, String> metadata = new HashMap<>();
        putIfValid(metadata, "productId", request.productId());
        putIfValid(metadata, "gclid", request.gclid());
        putIfValid(metadata, "fbclid", request.fbclid());
        putIfValid(metadata, "campaign", request.campaign());
        putIfValid(metadata, "source", request.source());


        // 3. Configuramos los parámetros de la sesión de Checkout
        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(request.successUrl() + "?session_id={CHECKOUT_SESSION_ID}")
            .setCancelUrl(request.cancelUrl())
            .putAllMetadata(metadata) 
            .addLineItem(
                SessionCreateParams.LineItem.builder()
                    .setQuantity(1L)
                    .setPrice(stripePriceId) // Aquí inyectamos el ID ya resuelto
                    .build()
            )
            .build();

        Session session = Session.create(params);

        // 4. Devolvemos la URL y el ID al Frontend
        Map<String, String> response = new HashMap<>();
        response.put("sessionId", session.getId());
        response.put("url", session.getUrl()); 
        
        System.out.println(">>> [SRE SUCCESS] Checkout creado para " + request.productId() + ". URL: " + session.getUrl());
        return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Stripe session creation failed"));
        }
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<?> getSession(@PathVariable String sessionId) throws Exception {
        Stripe.apiKey = stripeApiKey;

        Session session = Session.retrieve(sessionId);

        Map<String, Object> response = Map.of(
                "id", session.getId(),
                "email", session.getCustomerDetails() != null
                        ? session.getCustomerDetails().getEmail()
                        : null,
                "amount", session.getAmountTotal() != null
                        ? session.getAmountTotal() / 100.0
                        : 0.0,
                "status", session.getPaymentStatus()
        );

        return ResponseEntity.ok(response);
    }

    /**
     * Mapeo de productos del negocio a IDs técnicos de Stripe.
     * Requerimiento del equipo Frontend.
     */
    private String resolvePriceId(String productId) {
        return switch (productId) {
            case "pro_plan" -> "price_1T4PWa12wkAy9LpKp618g9Cd"; // Tu ID real de Stripe
            case "basic_plan" -> "price_1T4P... (poner_otro_id_real)"; 
            default -> throw new IllegalArgumentException("Invalid productId: " + productId);
        };
    }

    private void putIfValid(Map<String, String> map, String key, String value) {
        if (value != null && !value.isBlank() && value.length() <= 255) {
            map.put(key, value);
        }
    }
}