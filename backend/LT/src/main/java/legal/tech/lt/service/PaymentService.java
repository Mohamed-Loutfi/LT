package legal.tech.lt.service;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import legal.tech.lt.entity.Transaction;
import legal.tech.lt.entity.User;
import legal.tech.lt.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    private final TransactionRepository transactionRepository;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    public PaymentService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Map<String, Object> createPaymentIntent(Long amount, String currency, User user) throws Exception {
        Stripe.apiKey = stripeSecretKey;

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount) // en centimes
                .setCurrency(currency)
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        // Sauvegarder la transaction
        Transaction transaction = Transaction.builder()
                .stripePaymentId(intent.getId())
                .amount(amount)
                .currency(currency)
                .status(intent.getStatus())
                .user(user)
                .build();
        transactionRepository.save(transaction);

        Map<String, Object> response = new HashMap<>();
        response.put("clientSecret", intent.getClientSecret());
        return response;
    }

    public void updateTransactionStatus(String paymentId, String status) {
        Transaction transaction = transactionRepository.findAll()
                .stream()
                .filter(t -> t.getStripePaymentId().equals(paymentId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setStatus(status);
        transactionRepository.save(transaction);
    }
}
