package com.tuempresa.tracking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stripe_events")
public class StripeEventRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String email;
    private Double amount;
    private String status;
    private LocalDateTime createdAt;

    public StripeEventRecord() {}

    // Constructor para VENTAS REALES (Arregla el error de compilacion)
    public StripeEventRecord(String email, Double amount, String status) {
        this(email, amount, status, LocalDateTime.now());
    }

    // Constructor para SIMULACION (Permite inyectar fechas pasadas)
    public StripeEventRecord(String email, Double amount, String status, LocalDateTime createdAt) {
        this.email = email;
        this.amount = amount;
        this.status = status;
        this.createdAt = createdAt;
    }
}
