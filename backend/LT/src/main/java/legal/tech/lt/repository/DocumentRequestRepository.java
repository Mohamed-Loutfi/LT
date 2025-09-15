package legal.tech.lt.repository;

import legal.tech.lt.entity.DocumentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DocumentRequestRepository extends JpaRepository<DocumentRequest, Long> {
    List<DocumentRequest> findByRequesterId(Long requesterId);
}
