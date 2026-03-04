package com.tuempresa.tracking.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data 
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String stripeSessionId;
    private String plan;
    private String email;  // Asegurate que este campo esté
    private String gclid;
    private String fbclid; // <--- ESTO ES LO QUE FALTA
    private String status;
    
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = "PENDING";
    }

    // Métodos explícitos por si Lombok falla en tu IDE
    public void setFbclid(String fbclid) { this.fbclid = fbclid; }
    public void setEmail(String email) { this.email = email; }
}