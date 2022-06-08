package com.pluralsight.patientportal.web.rest;

import com.pluralsight.patientportal.domain.Patientportal;
import com.pluralsight.patientportal.repository.PatientportalRepository;
import com.pluralsight.patientportal.service.PatientportalService;
import com.pluralsight.patientportal.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.pluralsight.patientportal.domain.Patientportal}.
 */
@RestController
@RequestMapping("/api")
public class PatientportalResource {

    private final Logger log = LoggerFactory.getLogger(PatientportalResource.class);

    private static final String ENTITY_NAME = "patientportal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PatientportalService patientportalService;

    private final PatientportalRepository patientportalRepository;

    public PatientportalResource(PatientportalService patientportalService, PatientportalRepository patientportalRepository) {
        this.patientportalService = patientportalService;
        this.patientportalRepository = patientportalRepository;
    }

    /**
     * {@code POST  /patientportals} : Create a new patientportal.
     *
     * @param patientportal the patientportal to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new patientportal, or with status {@code 400 (Bad Request)} if the patientportal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/patientportals")
    public ResponseEntity<Patientportal> createPatientportal(@Valid @RequestBody Patientportal patientportal) throws URISyntaxException {
        log.debug("REST request to save Patientportal : {}", patientportal);
        if (patientportal.getId() != null) {
            throw new BadRequestAlertException("A new patientportal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Patientportal result = patientportalService.save(patientportal);
        return ResponseEntity
            .created(new URI("/api/patientportals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /patientportals/:id} : Updates an existing patientportal.
     *
     * @param id the id of the patientportal to save.
     * @param patientportal the patientportal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated patientportal,
     * or with status {@code 400 (Bad Request)} if the patientportal is not valid,
     * or with status {@code 500 (Internal Server Error)} if the patientportal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/patientportals/{id}")
    public ResponseEntity<Patientportal> updatePatientportal(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Patientportal patientportal
    ) throws URISyntaxException {
        log.debug("REST request to update Patientportal : {}, {}", id, patientportal);
        if (patientportal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, patientportal.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!patientportalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Patientportal result = patientportalService.update(patientportal);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, patientportal.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /patientportals/:id} : Partial updates given fields of an existing patientportal, field will ignore if it is null
     *
     * @param id the id of the patientportal to save.
     * @param patientportal the patientportal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated patientportal,
     * or with status {@code 400 (Bad Request)} if the patientportal is not valid,
     * or with status {@code 404 (Not Found)} if the patientportal is not found,
     * or with status {@code 500 (Internal Server Error)} if the patientportal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/patientportals/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Patientportal> partialUpdatePatientportal(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Patientportal patientportal
    ) throws URISyntaxException {
        log.debug("REST request to partial update Patientportal partially : {}, {}", id, patientportal);
        if (patientportal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, patientportal.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!patientportalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Patientportal> result = patientportalService.partialUpdate(patientportal);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, patientportal.getId().toString())
        );
    }

    /**
     * {@code GET  /patientportals} : get all the patientportals.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of patientportals in body.
     */
    @GetMapping("/patientportals")
    public List<Patientportal> getAllPatientportals() {
        log.debug("REST request to get all Patientportals");
        return patientportalService.findAll();
    }

    /**
     * {@code GET  /patientportals/:id} : get the "id" patientportal.
     *
     * @param id the id of the patientportal to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the patientportal, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/patientportals/{id}")
    public ResponseEntity<Patientportal> getPatientportal(@PathVariable Long id) {
        log.debug("REST request to get Patientportal : {}", id);
        Optional<Patientportal> patientportal = patientportalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(patientportal);
    }

    /**
     * {@code DELETE  /patientportals/:id} : delete the "id" patientportal.
     *
     * @param id the id of the patientportal to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/patientportals/{id}")
    public ResponseEntity<Void> deletePatientportal(@PathVariable Long id) {
        log.debug("REST request to delete Patientportal : {}", id);
        patientportalService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
