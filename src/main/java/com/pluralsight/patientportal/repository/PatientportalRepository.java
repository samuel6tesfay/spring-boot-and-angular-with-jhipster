package com.pluralsight.patientportal.repository;

import java.util.List;

import com.pluralsight.patientportal.domain.Patientportal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Patientportal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PatientportalRepository extends JpaRepository<Patientportal, Long> {
    // List<Patientportal> findByEmail(String email);
    List<Patientportal> findByUserId(Long userId);

}
