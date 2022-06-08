package com.pluralsight.patientportal.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pluralsight.patientportal.IntegrationTest;
import com.pluralsight.patientportal.domain.Patientportal;
import com.pluralsight.patientportal.repository.PatientportalRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PatientportalResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PatientportalResourceIT {

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    private static final String DEFAULT_INSURANCE_CHANGE = "AAAAAAAAAA";
    private static final String UPDATED_INSURANCE_CHANGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_PHONE_NUMBER = 1;
    private static final Integer UPDATED_PHONE_NUMBER = 2;

    private static final String ENTITY_API_URL = "/api/patientportals";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PatientportalRepository patientportalRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPatientportalMockMvc;

    private Patientportal patientportal;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Patientportal createEntity(EntityManager em) {
        Patientportal patientportal = new Patientportal()
            .reason(DEFAULT_REASON)
            .insuranceChange(DEFAULT_INSURANCE_CHANGE)
            .phoneNumber(DEFAULT_PHONE_NUMBER);
        return patientportal;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Patientportal createUpdatedEntity(EntityManager em) {
        Patientportal patientportal = new Patientportal()
            .reason(UPDATED_REASON)
            .insuranceChange(UPDATED_INSURANCE_CHANGE)
            .phoneNumber(UPDATED_PHONE_NUMBER);
        return patientportal;
    }

    @BeforeEach
    public void initTest() {
        patientportal = createEntity(em);
    }

    @Test
    @Transactional
    void createPatientportal() throws Exception {
        int databaseSizeBeforeCreate = patientportalRepository.findAll().size();
        // Create the Patientportal
        restPatientportalMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(patientportal))
            )
            .andExpect(status().isCreated());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeCreate + 1);
        Patientportal testPatientportal = patientportalList.get(patientportalList.size() - 1);
        assertThat(testPatientportal.getReason()).isEqualTo(DEFAULT_REASON);
        assertThat(testPatientportal.getInsuranceChange()).isEqualTo(DEFAULT_INSURANCE_CHANGE);
        assertThat(testPatientportal.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
    }

    @Test
    @Transactional
    void createPatientportalWithExistingId() throws Exception {
        // Create the Patientportal with an existing ID
        patientportal.setId(1L);

        int databaseSizeBeforeCreate = patientportalRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPatientportalMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(patientportal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkInsuranceChangeIsRequired() throws Exception {
        int databaseSizeBeforeTest = patientportalRepository.findAll().size();
        // set the field null
        patientportal.setInsuranceChange(null);

        // Create the Patientportal, which fails.

        restPatientportalMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(patientportal))
            )
            .andExpect(status().isBadRequest());

        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = patientportalRepository.findAll().size();
        // set the field null
        patientportal.setPhoneNumber(null);

        // Create the Patientportal, which fails.

        restPatientportalMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(patientportal))
            )
            .andExpect(status().isBadRequest());

        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPatientportals() throws Exception {
        // Initialize the database
        patientportalRepository.saveAndFlush(patientportal);

        // Get all the patientportalList
        restPatientportalMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(patientportal.getId().intValue())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON)))
            .andExpect(jsonPath("$.[*].insuranceChange").value(hasItem(DEFAULT_INSURANCE_CHANGE)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)));
    }

    @Test
    @Transactional
    void getPatientportal() throws Exception {
        // Initialize the database
        patientportalRepository.saveAndFlush(patientportal);

        // Get the patientportal
        restPatientportalMockMvc
            .perform(get(ENTITY_API_URL_ID, patientportal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(patientportal.getId().intValue()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON))
            .andExpect(jsonPath("$.insuranceChange").value(DEFAULT_INSURANCE_CHANGE))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER));
    }

    @Test
    @Transactional
    void getNonExistingPatientportal() throws Exception {
        // Get the patientportal
        restPatientportalMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPatientportal() throws Exception {
        // Initialize the database
        patientportalRepository.saveAndFlush(patientportal);

        int databaseSizeBeforeUpdate = patientportalRepository.findAll().size();

        // Update the patientportal
        Patientportal updatedPatientportal = patientportalRepository.findById(patientportal.getId()).get();
        // Disconnect from session so that the updates on updatedPatientportal are not directly saved in db
        em.detach(updatedPatientportal);
        updatedPatientportal.reason(UPDATED_REASON).insuranceChange(UPDATED_INSURANCE_CHANGE).phoneNumber(UPDATED_PHONE_NUMBER);

        restPatientportalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPatientportal.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPatientportal))
            )
            .andExpect(status().isOk());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeUpdate);
        Patientportal testPatientportal = patientportalList.get(patientportalList.size() - 1);
        assertThat(testPatientportal.getReason()).isEqualTo(UPDATED_REASON);
        assertThat(testPatientportal.getInsuranceChange()).isEqualTo(UPDATED_INSURANCE_CHANGE);
        assertThat(testPatientportal.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    void putNonExistingPatientportal() throws Exception {
        int databaseSizeBeforeUpdate = patientportalRepository.findAll().size();
        patientportal.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPatientportalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, patientportal.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(patientportal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPatientportal() throws Exception {
        int databaseSizeBeforeUpdate = patientportalRepository.findAll().size();
        patientportal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPatientportalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(patientportal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPatientportal() throws Exception {
        int databaseSizeBeforeUpdate = patientportalRepository.findAll().size();
        patientportal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPatientportalMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(patientportal))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePatientportalWithPatch() throws Exception {
        // Initialize the database
        patientportalRepository.saveAndFlush(patientportal);

        int databaseSizeBeforeUpdate = patientportalRepository.findAll().size();

        // Update the patientportal using partial update
        Patientportal partialUpdatedPatientportal = new Patientportal();
        partialUpdatedPatientportal.setId(patientportal.getId());

        partialUpdatedPatientportal.reason(UPDATED_REASON).insuranceChange(UPDATED_INSURANCE_CHANGE).phoneNumber(UPDATED_PHONE_NUMBER);

        restPatientportalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPatientportal.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPatientportal))
            )
            .andExpect(status().isOk());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeUpdate);
        Patientportal testPatientportal = patientportalList.get(patientportalList.size() - 1);
        assertThat(testPatientportal.getReason()).isEqualTo(UPDATED_REASON);
        assertThat(testPatientportal.getInsuranceChange()).isEqualTo(UPDATED_INSURANCE_CHANGE);
        assertThat(testPatientportal.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    void fullUpdatePatientportalWithPatch() throws Exception {
        // Initialize the database
        patientportalRepository.saveAndFlush(patientportal);

        int databaseSizeBeforeUpdate = patientportalRepository.findAll().size();

        // Update the patientportal using partial update
        Patientportal partialUpdatedPatientportal = new Patientportal();
        partialUpdatedPatientportal.setId(patientportal.getId());

        partialUpdatedPatientportal.reason(UPDATED_REASON).insuranceChange(UPDATED_INSURANCE_CHANGE).phoneNumber(UPDATED_PHONE_NUMBER);

        restPatientportalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPatientportal.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPatientportal))
            )
            .andExpect(status().isOk());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeUpdate);
        Patientportal testPatientportal = patientportalList.get(patientportalList.size() - 1);
        assertThat(testPatientportal.getReason()).isEqualTo(UPDATED_REASON);
        assertThat(testPatientportal.getInsuranceChange()).isEqualTo(UPDATED_INSURANCE_CHANGE);
        assertThat(testPatientportal.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    void patchNonExistingPatientportal() throws Exception {
        int databaseSizeBeforeUpdate = patientportalRepository.findAll().size();
        patientportal.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPatientportalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, patientportal.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(patientportal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPatientportal() throws Exception {
        int databaseSizeBeforeUpdate = patientportalRepository.findAll().size();
        patientportal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPatientportalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(patientportal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPatientportal() throws Exception {
        int databaseSizeBeforeUpdate = patientportalRepository.findAll().size();
        patientportal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPatientportalMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(patientportal))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Patientportal in the database
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePatientportal() throws Exception {
        // Initialize the database
        patientportalRepository.saveAndFlush(patientportal);

        int databaseSizeBeforeDelete = patientportalRepository.findAll().size();

        // Delete the patientportal
        restPatientportalMockMvc
            .perform(delete(ENTITY_API_URL_ID, patientportal.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Patientportal> patientportalList = patientportalRepository.findAll();
        assertThat(patientportalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
