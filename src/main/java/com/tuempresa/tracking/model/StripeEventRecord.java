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

    // --- CAMPOS DE TRAZABILIDAD (Mapeo con Neon) ---
    @Column(name = "session_id")
    private String sessionId;

    @Column(name = "product_id")
    private String productId;

    private String gclid;
    private String fbclid;
    private String campaign;
    private String source;

    // --- CONSTRUCTORES ---
    public StripeEventRecord() {}

    public StripeEventRecord(String email, Double amount, String status) {
        this(email, amount, status, LocalDateTime.now());
    }

    public StripeEventRecord(String email, Double amount, String status, LocalDateTime createdAt) {
        this.email = email;
        this.amount = amount;
        this.status = status;
        this.createdAt = createdAt;
    }

    // --- GETTERS Y SETTERS (Esenciales para Spring Data JPA) ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getGclid() { return gclid; }
    public void setGclid(String gclid) { this.gclid = gclid; }

    public String getFbclid() { return fbclid; }
    public void setFbclid(String fbclid) { this.fbclid = fbclid; }

    public String getCampaign() { return campaign; }
    public void setCampaign(String campaign) { this.campaign = campaign; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}