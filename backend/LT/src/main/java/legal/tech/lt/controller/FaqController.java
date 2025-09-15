package legal.tech.lt.controller;

import legal.tech.lt.entity.ChatMessage;
import legal.tech.lt.entity.User;
import legal.tech.lt.repository.UserRepository;
import legal.tech.lt.service.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
@RestController
@RequestMapping("/api/faq")
public class FaqController {

    private final FaqService faqService;
    private final UserRepository userRepository;

    public FaqController(FaqService faqService, UserRepository userRepository) {
        this.faqService = faqService;
        this.userRepository = userRepository;
    }

    @PostMapping("/ask")
    public ChatMessage askQuestion(@RequestBody Map<String, String> request,
                                   @AuthenticationPrincipal UserDetails userDetails) {
        String question = request.get("question");

        // Récupérer l'utilisateur connecté
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return faqService.askQuestion(question, user);
    }
}
