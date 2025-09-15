package legal.tech.lt.service;

import legal.tech.lt.entity.ChatMessage;
import legal.tech.lt.entity.User;
import legal.tech.lt.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FaqService {

    private final RestTemplate restTemplate;
    private final ChatMessageRepository chatRepo;

    @Value("${openai.api.key}")
    private String openAiApiKey;

    public FaqService(RestTemplate restTemplate, ChatMessageRepository chatRepo) {
        this.restTemplate = restTemplate;
        this.chatRepo = chatRepo;
    }

    public List<ChatMessage> getHistory(Long userId) {
        return chatRepo.findByUserId(userId);
    }


    public ChatMessage askQuestion(String question, User user) {
        // 1. Sauvegarder la question
        ChatMessage userMsg = ChatMessage.builder()
                .sender("USER")
                .message(question)
                .user(user)
                .build();
        chatRepo.save(userMsg);

        // 2. Préparer la requête pour OpenAI
        String url = "https://api.openai.com/v1/chat/completions";
        Map<String, Object> request = new HashMap<>();
        request.put("model", "gpt-4o-mini");
        request.put("messages", List.of(
                Map.of("role", "system", "content",
                        "Tu es un assistant juridique spécialisé en droit français et marocain. " +
                                "Tu dois répondre uniquement aux questions liées au domaine juridique au Maroc: droit du travail, droit des sociétés, droit fiscal, etc. " +
                                "Si la question n'est pas juridique, réponds simplement : 'Je suis spécialisé dans le domaine juridique, je ne peux pas répondre à cette question.'"),
                Map.of("role", "user", "content", question)
        ));


        // 3. Envoyer la requête
        Map<String, Object> response = restTemplate.postForObject(
                url,
                new org.springframework.http.HttpEntity<>(request, createHeaders()),
                Map.class
        );

        // 4. Extraire la réponse
        String answer = "Réponse non lisible.";
        try {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            Map<String, Object> firstChoice = choices.get(0);
            Map<String, Object> messageObj = (Map<String, Object>) firstChoice.get("message");

            Object content = messageObj.get("content");

            // 🚀 Ajout de logs pour debug
            System.out.println("=== DEBUG OPENAI RESPONSE ===");
            System.out.println("Réponse brute : " + response);
            System.out.println("Message Object : " + messageObj);
            System.out.println("Content extrait : " + content);
            System.out.println("Type de content : " + (content != null ? content.getClass() : "null"));
            System.out.println("=============================");

            if (content instanceof String) {
                answer = (String) content;
            } else if (content instanceof List) {
                List<Map<String, Object>> contentList = (List<Map<String, Object>>) content;
                answer = contentList.stream()
                        .map(item -> item.getOrDefault("text", "").toString())
                        .reduce("", (a, b) -> a + " " + b).trim();
            } else {
                answer = content.toString(); // fallback
            }
        } catch (Exception e) {
            e.printStackTrace();
            answer = "Erreur lors du parsing de la réponse IA : " + e.getMessage();
        }

        // 5. Sauvegarder la réponse AI
        ChatMessage aiMsg = ChatMessage.builder()
                .sender("AI")
                .message(answer != null ? answer.toString() : "")
                .user(user)
                .build();
        chatRepo.save(aiMsg);

        return aiMsg;
    }



    private org.springframework.http.HttpHeaders createHeaders() {
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.set("Authorization", "Bearer " + openAiApiKey);
        headers.set("Content-Type", "application/json");
        return headers;
    }
}
