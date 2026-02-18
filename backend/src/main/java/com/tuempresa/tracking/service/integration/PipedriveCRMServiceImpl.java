package com.tuempresa.tracking.service.integration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;
import java.util.Map;

@Service
public class PipedriveCRMServiceImpl implements CRMIntegrationService {

    // Reemplazamos @Slf4j por la instanciación nativa y directa de Java
    private static final Logger log = LoggerFactory.getLogger(PipedriveCRMServiceImpl.class);

    private final WebClient webClient;
    
    private final String apiToken = "8ef4e1618893b13b34b5d63667ea6aae1a6cd941"; 

    public PipedriveCRMServiceImpl(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("https://api.pipedrive.com/v1").build();
    }

    @Override
    public void registrarVenta(String email, double monto) {
        log.info(">>> [SRE DEBUG] Intentando conexión directa con Token: {}...", apiToken.substring(0, 5) + "****");

        Map<String, Object> deal = Map.of(
            "title", "Venta Stripe: " + email,
            "value", monto,
            "currency", "USD",
            "status", "open"
        );

        webClient.post()
            .uri(uriBuilder -> uriBuilder
                .path("/deals")
                .queryParam("api_token", apiToken.trim()) 
                .build())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(deal)
            .retrieve()
            .bodyToMono(String.class)
            .subscribe(
                res -> log.info(">>> [SRE SUCCESS] ¡TRATO CREADO!: {}", res),
                err -> log.error(">>> [SRE ERROR] Detalle del fallo: {}", err.getMessage())
            );
    }
}