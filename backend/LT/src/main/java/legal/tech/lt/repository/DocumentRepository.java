package legal.tech.lt.repository;



import legal.tech.lt.entity.Document;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
