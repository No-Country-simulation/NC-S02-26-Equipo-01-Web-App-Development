package com.tuempresa.tracking.controller;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.tuempresa.tracking.dto.CheckoutRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/checkout")
public class CheckoutController {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostMapping("/create-session")
    public Map<String, String> createSession(@RequestBody CheckoutRequest request) throws Exception {
        Stripe.apiKey = stripeApiKey;

        // 1. Resolvemos el ID de Stripe según el productId recibido
        String stripePriceId = resolvePriceId(request.productId());

        // 2. Construimos la metadata para la trazabilidad (Atribución)
        Map<String, String> metadata = new HashMap<>();
        metadata.put("gclid", request.gclid());
        metadata.put("campaign", request.campaign());
        metadata.put("source", request.source());

        // 3. Configuramos los parámetros de la sesión de Checkout
        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(request.successUrl())
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
        return response;
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
}