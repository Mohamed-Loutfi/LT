package legal.tech.lt.controller;

import legal.tech.lt.entity.LegalResource;
import legal.tech.lt.repository.LegalResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class LegalResourceController {

    @Autowired
    private LegalResourceRepository repository;

    @GetMapping
    public List<LegalResource> getAllResources() {
        return repository.findAll();
    }

    @GetMapping("/type/{type}")
    public List<LegalResource> getByType(@PathVariable String type) {
        return repository.findByType(type);
    }

    @PostMapping
    public LegalResource createResource(@RequestBody LegalResource resource) {
        return repository.save(resource);
    }

    @DeleteMapping("/{id}")
    public String deleteResource(@PathVariable Long id) {
        repository.deleteById(id);
        return "Resource deleted successfully";
    }
}
