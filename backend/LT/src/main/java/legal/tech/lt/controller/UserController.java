package legal.tech.lt.controller;

import legal.tech.lt.dto.UserDTO;
import legal.tech.lt.entity.User;
import legal.tech.lt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                ))
                .toList();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    @PostMapping
    public UserDTO createUser(@RequestBody User user) {
        User saved = userRepository.save(user);
        return new UserDTO(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole());
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id).orElseThrow();
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setRole(userDetails.getRole());
        User updated = userRepository.save(user);
        return new UserDTO(updated.getId(), updated.getName(), updated.getEmail(), updated.getRole());
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "User deleted successfully";
    }
}
