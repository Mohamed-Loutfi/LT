package legal.tech.lt.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender; // USER ou AI
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();

    // Relation avec User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
