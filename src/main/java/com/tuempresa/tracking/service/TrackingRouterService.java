package com.tuempresa.tracking.service;

import com.stripe.model.Event;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.tuempresa.tracking.model.StripeEventRecord;
import com.tuempresa.tracking.repository.StripeEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TrackingRouterService {

    private final StripeEventRepository repository;

    public TrackingRouterService(StripeEventRepository repository) {
        this.repository = repository;
    }

    public void routeEvent(Event event) {
        // Usamos checkout.session.completed porque contiene toda la metadata de marketing
        if ("checkout.session.completed".equals(event.getType())) {
            
            StripeObject dataObject = event.getDataObjectDeserializer().getObject().orElse(null);
            
            if (dataObject instanceof Session) {
                Session session = (Session) dataObject;
                
                String email = session.getCustomerDetails() != null ? session.getCustomerDetails().getEmail() : "sin_email@stripe.com";
                double amount = session.getAmountTotal() != null ? session.getAmountTotal() / 100.0 : 0.0;
                
                System.out.println(">>> [SRE MONITOR] Detectada sesión completada. Procesando metadata para: " + email);

                // 1. Creamos el registro con los datos básicos
                StripeEventRecord record = new StripeEventRecord(email, amount, "COMPLETED");
                record.setCreatedAt(LocalDateTime.now());

                // 2. Extraemos los IDs de trazabilidad (Criterios de Aceptación)
                record.setSessionId(session.getId());
                
                // 3. Extraemos la metadata de campañas y anuncios
                if (session.getMetadata() != null) {
                    record.setProductId(session.getMetadata().get("product_id"));
                    record.setGclid(session.getMetadata().get("gclid"));
                    record.setFbclid(session.getMetadata().get("fbclid"));
                    record.setCampaign(session.getMetadata().get("campaign"));
                    record.setSource(session.getMetadata().get("source"));
                }

                // 4. Persistencia final en PostgreSQL (Neon)
                repository.save(record);
                
                System.out.println(">>> [SRE SUCCESS] Venta y trazabilidad guardada en Neon. ID de Sesión: " + record.getSessionId());
                System.out.println(">>> [SRE DEBUG] Campaña detectada: " + (record.getCampaign() != null ? record.getCampaign() : "Orgánico"));
            }
        }
    }
}