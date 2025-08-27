package legal.tech.lt.repository;

import legal.tech.lt.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByOwnerId(Long ownerId); // retrouver les docs d’un utilisateur
}
