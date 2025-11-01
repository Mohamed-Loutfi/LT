package legal.tech.lt.controller;

import legal.tech.lt.dto.DocumentRequestDTO;
import legal.tech.lt.entity.DocumentRequest;
import legal.tech.lt.entity.User;
import legal.tech.lt.repository.DocumentRequestRepository;
import legal.tech.lt.repository.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents/request")
public class DocumentRequestController {

    private final DocumentRequestRepository requestRepo;
    private final UserRepository userRepo;

    public DocumentRequestController(DocumentRequestRepository requestRepo, UserRepository userRepo) {
        this.requestRepo = requestRepo;
        this.userRepo = userRepo;
    }

    // ✅ Créer une demande
    @PostMapping
    public DocumentRequest createRequest(
            @RequestBody DocumentRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        request.setRequester(user);
        return requestRepo.save(request);
    }

    // ✅ Récupérer toutes les demandes d’un user
    @GetMapping("/my")
    public List<DocumentRequest> getMyRequests(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return requestRepo.findByRequesterId(user.getId());
    }

    // ✅ Récupérer toutes les demandes (admin)
    @GetMapping
    public List<DocumentRequestDTO> getAllRequests() {
        return requestRepo.findAll().stream()
                .map(req -> new DocumentRequestDTO(
                        req.getId(),
                        req.getTitle(),
                        req.getDescription(),
                        req.getDocType(),
                        req.getCreatedAt(),
                        req.getRequester() != null ? req.getRequester().getName() : null,
                        req.getRequester() != null ? req.getRequester().getEmail() : null
                ))
                .toList();
    }

}
