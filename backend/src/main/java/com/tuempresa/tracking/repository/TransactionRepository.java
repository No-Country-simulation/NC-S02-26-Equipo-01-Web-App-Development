package com.tuempresa.tracking.repository;

import com.tuempresa.tracking.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // Esto lo usaremos luego en el Webhook para encontrar la transacción por el ID de Stripe
    Optional<Transaction> findByStripeSessionId(String stripeSessionId);
}
