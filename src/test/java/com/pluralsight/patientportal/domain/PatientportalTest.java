package com.pluralsight.patientportal.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.pluralsight.patientportal.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PatientportalTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Patientportal.class);
        Patientportal patientportal1 = new Patientportal();
        patientportal1.setId(1L);
        Patientportal patientportal2 = new Patientportal();
        patientportal2.setId(patientportal1.getId());
        assertThat(patientportal1).isEqualTo(patientportal2);
        patientportal2.setId(2L);
        assertThat(patientportal1).isNotEqualTo(patientportal2);
        patientportal1.setId(null);
        assertThat(patientportal1).isNotEqualTo(patientportal2);
    }
}
