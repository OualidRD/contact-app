package com.raidi.contact_app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "contacts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le prénom est obligatoire")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false)
    private String lastName;

    @Email(message = "L'email doit être valide")
    @NotBlank(message = "L'email est obligatoire")
    @Column(nullable = false, unique = true)
    private String email;

    @Pattern(
        regexp = "^[+]?[0-9]{7,15}$",
        message = "Le téléphone doit contenir 7-15 chiffres, + optionnel"
    )
    @Column(unique = true)
    private String phone;

    @Column(length = 255)
    private String address;

    @Column(length = 100)
    private String city;

    @Pattern(
        regexp = "^[0-9]{5}$|^[A-Z]{2}[0-9]{3}$",
        message = "Le code postal doit être au format français (5 chiffres)"
    )
    @Column(length = 10)
    private String postalCode;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
