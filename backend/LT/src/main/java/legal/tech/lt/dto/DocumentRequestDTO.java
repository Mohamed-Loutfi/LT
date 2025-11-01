package legal.tech.lt.dto;

import java.time.LocalDateTime;

public record DocumentRequestDTO(
        Long id,
        String title,
        String description,
        String docType,
        LocalDateTime createdAt,
        String requesterName,
        String requesterEmail
) {}
