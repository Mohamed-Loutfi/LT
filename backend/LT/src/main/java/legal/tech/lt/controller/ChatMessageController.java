package legal.tech.lt.controller;

import legal.tech.lt.entity.ChatMessage;
import legal.tech.lt.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatMessageController {

    @Autowired
    private ChatMessageRepository chatRepository;

    @GetMapping("/user/{userId}")
    public List<ChatMessage> getMessagesByUser(@PathVariable Long userId) {
        return chatRepository.findByUserId(userId);
    }

    @PostMapping
    public ChatMessage createMessage(@RequestBody ChatMessage message) {
        return chatRepository.save(message);
    }

    @DeleteMapping("/{id}")
    public String deleteMessage(@PathVariable Long id) {
        chatRepository.deleteById(id);
        return "Message deleted successfully";
    }
}
