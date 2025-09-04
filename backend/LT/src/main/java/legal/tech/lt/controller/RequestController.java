package legal.tech.lt.controller;

import legal.tech.lt.entity.Request;
import legal.tech.lt.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @GetMapping
    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Request> getRequestsByUser(@PathVariable Long userId) {
        return requestRepository.findByUserId(userId);
    }

    @PostMapping
    public Request createRequest(@RequestBody Request request) {
        return requestRepository.save(request);
    }

    @PutMapping("/{id}")
    public Request updateRequest(@PathVariable Long id, @RequestBody Request requestDetails) {
        Request req = requestRepository.findById(id).orElseThrow();
        req.setTitle(requestDetails.getTitle());
        req.setDescription(requestDetails.getDescription());
        req.setStatus(requestDetails.getStatus());
        return requestRepository.save(req);
    }

    @DeleteMapping("/{id}")
    public String deleteRequest(@PathVariable Long id) {
        requestRepository.deleteById(id);
        return "Request deleted successfully";
    }
}
