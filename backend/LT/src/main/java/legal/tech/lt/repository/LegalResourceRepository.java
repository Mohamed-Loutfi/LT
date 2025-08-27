package legal.tech.lt.repository;

import legal.tech.lt.entity.LegalResource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LegalResourceRepository extends JpaRepository<LegalResource, Long> {
    List<LegalResource> findByType(String type); // ex: ARTICLE, VIDEO, DICTIONARY_TERM
}
