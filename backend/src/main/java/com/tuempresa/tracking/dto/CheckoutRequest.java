package com.tuempresa.tracking.dto;

public record CheckoutRequest(
    String priceId,
    String gclid,
    String campaign,
    String source,
    String successUrl,
    String cancelUrl
) {}
