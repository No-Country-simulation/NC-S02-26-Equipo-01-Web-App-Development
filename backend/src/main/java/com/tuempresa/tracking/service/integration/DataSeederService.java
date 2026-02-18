package com.tuempresa.tracking.service;

import com.tuempresa.tracking.model.StripeEventRecord;
import com.tuempresa.tracking.repository.StripeEventRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class DataSeederService {
    private final StripeEventRepository repository;

    public DataSeederService(StripeEventRepository repository) {
        this.repository = repository;
    }

    public void seedHistoricalData(int days) {
        for (int i = 0; i < days; i++) {
            // Generamos registros con fechas decrementales
            StripeEventRecord record = new StripeEventRecord(
                "historico_" + i + "@test.com",
                (Math.random() * 50) + 100,
                "COMPLETED",
                LocalDateTime.now().minusDays(i) // Decrementamos la fecha para simular datos históricos
            );
            repository.save(record);
        }
        System.out.println(">>> [SRE INFO] " + days + " dÃ­as de datos inyectados con Ã©xito en Neon.");
    }
}
