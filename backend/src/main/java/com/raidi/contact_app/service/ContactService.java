package com.raidi.contact_app.service;

import com.raidi.contact_app.dto.ContactDTO;
import com.raidi.contact_app.exception.ResourceNotFoundException;
import com.raidi.contact_app.model.Contact;
import com.raidi.contact_app.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ContactService {

    private final ContactRepository contactRepository;

    /**
     * Récupérer tous les contacts
     */
    @Transactional(readOnly = true)
    public List<ContactDTO> getAllContacts() {
        return contactRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Récupérer un contact par ID
     */
    @Transactional(readOnly = true)
    public ContactDTO getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact non trouvé avec l'ID: " + id));
        return convertToDTO(contact);
    }

    /**
     * Créer un nouveau contact
     */
    public ContactDTO createContact(ContactDTO contactDTO) {
        // Vérifier si l'email existe déjà
        if (contactRepository.findByEmail(contactDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Un contact avec cet email existe déjà");
        }

        // Vérifier si le téléphone existe déjà
        if (contactRepository.findByPhone(contactDTO.getPhone()).isPresent()) {
            throw new IllegalArgumentException("Un contact avec ce numéro de téléphone existe déjà");
        }

        Contact contact = convertToEntity(contactDTO);
        Contact savedContact = contactRepository.save(contact);
        return convertToDTO(savedContact);
    }

    /**
     * Mettre à jour un contact
     */
    public ContactDTO updateContact(Long id, ContactDTO contactDTO) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact non trouvé avec l'ID: " + id));

        // Vérifier si le nouvel email existe déjà (et qu'il n'appartient pas au contact actuel)
        if (!contact.getEmail().equals(contactDTO.getEmail()) &&
            contactRepository.findByEmail(contactDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Un contact avec cet email existe déjà");
        }

        // Vérifier si le nouveau téléphone existe déjà (et qu'il n'appartient pas au contact actuel)
        if (!contact.getPhone().equals(contactDTO.getPhone()) &&
            contactRepository.findByPhone(contactDTO.getPhone()).isPresent()) {
            throw new IllegalArgumentException("Un contact avec ce numéro de téléphone existe déjà");
        }

        contact.setFirstName(contactDTO.getFirstName());
        contact.setLastName(contactDTO.getLastName());
        contact.setEmail(contactDTO.getEmail());
        contact.setPhone(contactDTO.getPhone());
        contact.setAddress(contactDTO.getAddress());
        contact.setCity(contactDTO.getCity());
        contact.setPostalCode(contactDTO.getPostalCode());

        Contact updatedContact = contactRepository.save(contact);
        return convertToDTO(updatedContact);
    }

    /**
     * Supprimer un contact
     */
    public void deleteContact(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact non trouvé avec l'ID: " + id));
        contactRepository.delete(contact);
    }

    /**
     * Rechercher des contacts par nom
     */
    @Transactional(readOnly = true)
    public List<ContactDTO> searchContacts(String name) {
        return contactRepository.searchByName(name)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Récupérer les contacts par ville
     */
    @Transactional(readOnly = true)
    public List<ContactDTO> getContactsByCity(String city) {
        return contactRepository.findByCity(city)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convertir Entity en DTO
     */
    private ContactDTO convertToDTO(Contact contact) {
        return ContactDTO.builder()
                .id(contact.getId())
                .firstName(contact.getFirstName())
                .lastName(contact.getLastName())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .address(contact.getAddress())
                .city(contact.getCity())
                .postalCode(contact.getPostalCode())
                .build();
    }

    /**
     * Convertir DTO en Entity
     */
    private Contact convertToEntity(ContactDTO contactDTO) {
        return Contact.builder()
                .firstName(contactDTO.getFirstName())
                .lastName(contactDTO.getLastName())
                .email(contactDTO.getEmail())
                .phone(contactDTO.getPhone())
                .address(contactDTO.getAddress())
                .city(contactDTO.getCity())
                .postalCode(contactDTO.getPostalCode())
                .build();
    }

}
