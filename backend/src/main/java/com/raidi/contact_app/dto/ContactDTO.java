package com.raidi.contact_app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactDTO {

    private Long id;

    @NotBlank(message = "Le prénom est obligatoire")
    private String firstName;

    @NotBlank(message = "Le nom est obligatoire")
    private String lastName;

    @Email(message = "L'email doit être valide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;

    @Pattern(
        regexp = "^[+]?[0-9]{7,15}$",
        message = "Le numéro de téléphone doit être valide (7-15 chiffres, peut commencer par +)"
    )
    @NotBlank(message = "Le téléphone est obligatoire")
    private String phone;

    private String address;

    private String city;

    private String postalCode;

}
