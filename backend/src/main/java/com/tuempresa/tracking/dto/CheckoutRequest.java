package com.tuempresa.tracking.dto;

public record CheckoutRequest(
    String productId,
    String gclid,
    String fbclid,
    String campaign,
    String source,
    String successUrl,
    String cancelUrl
) {}
