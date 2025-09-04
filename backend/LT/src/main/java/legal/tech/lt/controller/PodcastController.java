package legal.tech.lt.controller;

import legal.tech.lt.entity.Podcast;
import legal.tech.lt.repository.PodcastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/podcasts")
public class PodcastController {

    @Autowired
    private PodcastRepository podcastRepository;

    @GetMapping
    public List<Podcast> getAllPodcasts() {
        return podcastRepository.findAll();
    }

    @PostMapping
    public Podcast createPodcast(@RequestBody Podcast podcast) {
        return podcastRepository.save(podcast);
    }

    @DeleteMapping("/{id}")
    public String deletePodcast(@PathVariable Long id) {
        podcastRepository.deleteById(id);
        return "Podcast deleted successfully";
    }
}
