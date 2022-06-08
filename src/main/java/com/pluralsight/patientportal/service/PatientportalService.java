package com.pluralsight.patientportal.service;

import com.pluralsight.patientportal.domain.Patientportal;
import com.pluralsight.patientportal.domain.User;
import com.pluralsight.patientportal.repository.PatientportalRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import liquibase.pro.packaged.is;

/**
 * Service Implementation for managing {@link Patientportal}.
 */
@Service
@Transactional
public class PatientportalService {

    private final Logger log = LoggerFactory.getLogger(PatientportalService.class);

    private final PatientportalRepository patientportalRepository;

    public PatientportalService(PatientportalRepository patientportalRepository) {
        this.patientportalRepository = patientportalRepository;
    }

    /**
     * Save a patientportal.
     *
     * @param patientportal the entity to save.
     * @return the persisted entity.
     */
    public Patientportal save(Patientportal patientportal) {
        log.debug("Request to save Patientportal : {}", patientportal);

        final Optional<User> isUser = UserService.getUserWithAuthorities();
        if (!isUser.isPresent()) {
            return patientportal;
        }

        patientportal.setUserId(isUser.get().getId());
        return patientportalRepository.save(patientportal);
    }

    /**
     * Update a patientportal.
     *
     * @param patientportal the entity to save.
     * @return the persisted entity.
     */
    public Patientportal update(Patientportal patientportal) {
        log.debug("Request to save Patientportal : {}", patientportal);
        return patientportalRepository.save(patientportal);
    }

    /**
     * Partially update a patientportal.
     *
     * @param patientportal the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Patientportal> partialUpdate(Patientportal patientportal) {
        log.debug("Request to partially update Patientportal : {}", patientportal);

        return patientportalRepository
            .findById(patientportal.getId())
            .map(existingPatientportal -> {
                if (patientportal.getReason() != null) {
                    existingPatientportal.setReason(patientportal.getReason());
                }
                if (patientportal.getInsuranceChange() != null) {
                    existingPatientportal.setInsuranceChange(patientportal.getInsuranceChange());
                }
                if (patientportal.getPhoneNumber() != null) {
                    existingPatientportal.setPhoneNumber(patientportal.getPhoneNumber());
                }

                return existingPatientportal;
            })
            .map(patientportalRepository::save);
    }

    /**
     * Get all the patientportals.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Patientportal> findAll() {
        log.debug("Request to get all Patientportals");

        final Optional<User> isUser = UserService.getUserWithAuthorities(); 
        final Long userId = isUser.get().getId();
        return patientportalRepository.findByUserId(userId);

    }

    /**
     * Get one patientportal by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Patientportal> findOne(Long id) {
        log.debug("Request to get Patientportal : {}", id);
        return patientportalRepository.findById(id);
    }

    /**
     * Delete the patientportal by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Patientportal : {}", id);
        patientportalRepository.deleteById(id);
    }
}
