package legal.tech.lt.controller;

import legal.tech.lt.entity.User;
import legal.tech.lt.repository.UserRepository;
import legal.tech.lt.service.PaymentService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserRepository userRepository;

    public PaymentController(PaymentService paymentService, UserRepository userRepository) {
        this.paymentService = paymentService;
        this.userRepository = userRepository;
    }

    @PostMapping("/create-payment-intent")
    public Map<String, Object> createPaymentIntent(@RequestBody Map<String, Object> request,
                                                   @AuthenticationPrincipal UserDetails userDetails) throws Exception {
        Long amount = Long.parseLong(request.get("amount").toString());
        String currency = request.getOrDefault("currency", "eur").toString();

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return paymentService.createPaymentIntent(amount, currency, user);
    }
}
