package legal.tech.lt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Désactive CSRF (utile pour API REST, pas pour les formulaires HTML classiques)
                .csrf(csrf -> csrf.disable())

                // Nouvelle syntaxe pour définir les règles d'autorisation
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/hello").permitAll()
                        .anyRequest().authenticated()
                )

                // Nouvelle syntaxe pour activer le formulaire de login par défaut
                .formLogin(Customizer.withDefaults());

        return http.build();
    }
}
