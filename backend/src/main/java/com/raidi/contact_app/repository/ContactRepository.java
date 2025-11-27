package com.raidi.contact_app.repository;

import com.raidi.contact_app.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    // Rechercher par email
    Optional<Contact> findByEmail(String email);

    // Rechercher par téléphone
    Optional<Contact> findByPhone(String phone);

    // Rechercher par nom (prénom ou nom)
    @Query("SELECT c FROM Contact c WHERE LOWER(c.firstName) LIKE LOWER(CONCAT('%', :name, '%')) " +
           "OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Contact> searchByName(@Param("name") String name);

    // Rechercher par ville
    List<Contact> findByCity(String city);

}
