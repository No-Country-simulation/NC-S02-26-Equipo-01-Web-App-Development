package com.tuempresa.tracking.controller;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.tuempresa.tracking.dto.CheckoutRequest;
import com.tuempresa.tracking.model.Transaction;
import com.tuempresa.tracking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    public Map<String, String> createSession(@RequestBody CheckoutRequest request) throws Exception {
        Stripe.apiKey = stripeApiKey;

        // 1. Configuración de la sesión en modo SUBSCRIPTION
        // Permite combinar el Setup Fee (puntual) con la mensualidad (recurrente)
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.SUBSCRIPTION) 
            .setSuccessUrl(request.successUrl() + "?session_id={CHECKOUT_SESSION_ID}")
            .setCancelUrl(request.cancelUrl())
            .putMetadata("gclid", request.gclid())
            .putMetadata("plan", request.productId());

        // 2. Inyección de IDs Reales según el plan seleccionado
        addPlanItems(paramsBuilder, request.productId());

        // 3. Creación de la sesión en los servidores de Stripe
        Session session = Session.create(paramsBuilder.build());

        // 4. PERSISTENCIA EN NEON DB (Trazabilidad SRE)
        Transaction transaction = new Transaction();
        transaction.setStripeSessionId(session.getId());
        transaction.setPlan(request.productId());
        transaction.setGclid(request.gclid());
        transaction.setStatus("PENDING");
        transactionRepository.save(transaction);

        // 5. Respuesta para el redireccionamiento del Frontend
        Map<String, String> response = new HashMap<>();
        response.put("sessionId", session.getId());
        response.put("url", session.getUrl()); 
        
        System.out.println(">>> [SRE SUCCESS] Checkout " + request.productId() + " generado. Session: " + session.getId());
        return response;
    }

    private void addPlanItems(SessionCreateParams.Builder builder, String productId) {
        if ("STARTER".equalsIgnoreCase(productId)) {
            // Setup Fee ($499 puntual)
            builder.addLineItem(createItem("price_1T6dFw12wkAy9LpKpUuYiTr6")); 
            // Monthly Fee ($150 mensual)
            builder.addLineItem(createItem("price_1T6dEI12wkAy9LpKRDjBgWch"));
            
        } else if ("GROWTH".equalsIgnoreCase(productId)) {
            // Setup Fee ($899 puntual)
            builder.addLineItem(createItem("price_1T6dSA12wkAy9LpKMAd2EJYO")); 
            // Monthly Fee ($299 mensual)
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
}