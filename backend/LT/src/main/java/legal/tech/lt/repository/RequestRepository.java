package legal.tech.lt.repository;

import legal.tech.lt.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByUserId(Long userId); // retrouver les demandes d’un utilisateur
}
