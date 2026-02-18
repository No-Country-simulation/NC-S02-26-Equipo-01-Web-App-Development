package com.tuempresa.tracking.service;

import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.tuempresa.tracking.model.StripeEventRecord;
import com.tuempresa.tracking.repository.StripeEventRepository;
import org.springframework.stereotype.Service;

@Service
public class TrackingRouterService {

    private final StripeEventRepository repository;

    public TrackingRouterService(StripeEventRepository repository) {
        this.repository = repository;
    }

    public void routeEvent(Event event) {
        if ("payment_intent.succeeded".equals(event.getType())) {
            
            String email = "cliente_prueba@stripe.com";
            double amount = 99.99;
            
            StripeObject dataObject = event.getDataObjectDeserializer().getObject().orElse(null);
            
            if (dataObject instanceof PaymentIntent) {
                PaymentIntent paymentIntent = (PaymentIntent) dataObject;
                if (paymentIntent.getReceiptEmail() != null) email = paymentIntent.getReceiptEmail();
                if (paymentIntent.getAmount() != null) amount = paymentIntent.getAmount() / 100.0;
            }

            System.out.println(">>> [SRE DEBUG] Guardando venta en PostgreSQL (Neon) para: " + email);
            
            // Magia de persistencia
            StripeEventRecord record = new StripeEventRecord(email, amount, "COMPLETED");
            repository.save(record);
            
            System.out.println(">>> [SRE DEBUG] Â¡Dato guardado con Ã©xito en la tabla stripe_events!");
        }
    }
}
