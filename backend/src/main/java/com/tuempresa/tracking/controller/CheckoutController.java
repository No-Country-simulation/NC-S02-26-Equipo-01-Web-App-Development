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

        // Construimos la metadata que el Frontend nos envía
        Map<String, String> metadata = new HashMap<>();
        metadata.put("gclid", request.gclid());
        metadata.put("campaign", request.campaign());
        metadata.put("source", request.source());

        SessionCreateParams params = SessionCreateParams.builder()
    .setMode(SessionCreateParams.Mode.PAYMENT)
    .setSuccessUrl(request.successUrl())
    .setCancelUrl(request.cancelUrl())
    .putAllMetadata(metadata) 
    .addLineItem(
        SessionCreateParams.LineItem.builder()
            .setQuantity(1L)
            .setPrice(request.priceId())
            .build()
    )
    .build();

        Session session = Session.create(params);

        // Devolvemos la URL generada por Stripe
        Map<String, String> response = new HashMap<>();
        response.put("sessionId", session.getId());
        response.put("url", session.getUrl()); 
        
        System.out.println(">>> [SRE INFO] Sesión de Checkout creada. URL: " + session.getUrl());
        return response;
    }
}
