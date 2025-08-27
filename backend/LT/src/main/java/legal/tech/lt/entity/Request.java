package legal.tech.lt.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status; // PENDING, IN_PROGRESS, DONE

    // Relation avec User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
