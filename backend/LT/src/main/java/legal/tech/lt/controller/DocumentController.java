package legal.tech.lt.controller;

import legal.tech.lt.entity.Document;
import legal.tech.lt.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentRepository documentRepository;

    @GetMapping
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Document> getDocumentsByUser(@PathVariable Long userId) {
        return documentRepository.findByOwnerId(userId);
    }

    @PostMapping
    public Document createDocument(@RequestBody Document document) {
        return documentRepository.save(document);
    }

    @DeleteMapping("/{id}")
    public String deleteDocument(@PathVariable Long id) {
        documentRepository.deleteById(id);
        return "Document deleted successfully";
    }
}
