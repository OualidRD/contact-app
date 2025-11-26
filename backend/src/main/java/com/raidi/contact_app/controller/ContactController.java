package com.raidi.contact_app.controller;

import com.raidi.contact_app.dto.ContactDTO;
import com.raidi.contact_app.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contacts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactService contactService;

    /**
     * GET /api/contacts - Récupérer tous les contacts
     */
    @GetMapping
    public ResponseEntity<List<ContactDTO>> getAllContacts() {
        List<ContactDTO> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(contacts);
    }

    /**
     * GET /api/contacts/{id} - Récupérer un contact par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ContactDTO> getContactById(@PathVariable Long id) {
        ContactDTO contact = contactService.getContactById(id);
        return ResponseEntity.ok(contact);
    }

    /**
     * POST /api/contacts - Créer un nouveau contact
     */
    @PostMapping
    public ResponseEntity<?> createContact(@Valid @RequestBody ContactDTO contactDTO) {
        try {
            ContactDTO createdContact = contactService.createContact(contactDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdContact);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
        }
    }

    /**
     * PUT /api/contacts/{id} - Mettre à jour un contact
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@PathVariable Long id, @Valid @RequestBody ContactDTO contactDTO) {
        try {
            ContactDTO updatedContact = contactService.updateContact(id, contactDTO);
            return ResponseEntity.ok(updatedContact);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
        }
    }

    /**
     * DELETE /api/contacts/{id} - Supprimer un contact
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Contact supprimé avec succès");
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/contacts/search?name=... - Rechercher des contacts par nom
     */
    @GetMapping("/search")
    public ResponseEntity<List<ContactDTO>> searchContacts(@RequestParam String name) {
        List<ContactDTO> contacts = contactService.searchContacts(name);
        return ResponseEntity.ok(contacts);
    }

    /**
     * GET /api/contacts/city?city=... - Récupérer les contacts par ville
     */
    @GetMapping("/city")
    public ResponseEntity<List<ContactDTO>> getContactsByCity(@RequestParam String city) {
        List<ContactDTO> contacts = contactService.getContactsByCity(city);
        return ResponseEntity.ok(contacts);
    }

}
