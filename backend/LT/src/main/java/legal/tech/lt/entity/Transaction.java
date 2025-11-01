package legal.tech.lt.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String stripePaymentId; // ID renvoyé par Stripe
    private Long amount;            // en centimes
    private String currency;        // ex: "eur" ou "mad"
    private String status;          // succeeded, failed, pending

    private LocalDateTime createdAt = LocalDateTime.now();

    // Relation avec User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
