package legal.tech.lt.controller;

import legal.tech.lt.config.JwtUtil;
import legal.tech.lt.dto.LoginRequest;
import legal.tech.lt.dto.RegisterRequest;
import legal.tech.lt.entity.User;
import legal.tech.lt.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {
        // 1. Créer l’utilisateur
        User newUser = authService.register(request);

        // 2. Générer un JWT pour ce nouvel utilisateur
        String token = jwtUtil.generateToken(newUser.getEmail());

        // 3. Retourner user + token
        return ResponseEntity.ok(Map.of(
                "user", newUser,
                "token", token
        ));
    }

}
