package legal.tech.lt.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "document_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;        // Titre de la demande
    private String description;  // Description détaillée
    private String docType;      // Type (contrat, statuts, etc.)

    private LocalDateTime createdAt = LocalDateTime.now();

    // Relation avec User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User requester;
}
