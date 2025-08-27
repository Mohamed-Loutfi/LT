package legal.tech.lt.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "legal_resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LegalResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String content;

    private String type; // ARTICLE, VIDEO, DICTIONARY_TERM
}
