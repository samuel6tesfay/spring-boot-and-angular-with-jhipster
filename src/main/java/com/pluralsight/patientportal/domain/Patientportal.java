package com.pluralsight.patientportal.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Patientportal.
 */
@Entity
@Table(name = "patientportal")
public class Patientportal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "reason")
    private String reason;

    @NotNull
    @Column(name = "insurance_change", nullable = false)
    private String insuranceChange;

    @NotNull
    @Column(name = "phone_number", nullable = false)
    private Integer phoneNumber;

    // @Column(name = "email", nullable = false)
    // private String email;
    // jhipster-needle-entity-add-field - JHipster will add fields here
    @Column(name = "user_id", nullable = false)
    private Long userId;

    public Long getId() {
        return this.id;
    }

    public Patientportal id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReason() {
        return this.reason;
    }

    public Patientportal reason(String reason) {
        this.setReason(reason);
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getInsuranceChange() {
        return this.insuranceChange;
    }

    
    public Patientportal insuranceChange(String insuranceChange) {
        this.setInsuranceChange(insuranceChange);
        return this;
    }

    public void setInsuranceChange(String insuranceChange) {
        this.insuranceChange = insuranceChange;
    }

    public Integer getPhoneNumber() {
        return this.phoneNumber;
    }

    public Patientportal phoneNumber(Integer phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Patientportal userId(Long userId) {
        this.setUserId(userId);
        return this;
    }

     public void setUserId(Long userId) {
        this.userId = userId;
    }

    // public String getEmail() {
    //     return this.email;
    // }

    // public Patientportal email(String email) {
    //     this.setEmail(email);
    //     return this;
    // }

    //  public void setEmail(String email) {
    //     this.email = email;
    // }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Patientportal)) {
            return false;
        }
        return id != null && id.equals(((Patientportal) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Patientportal{" +
            "id=" + getId() +
            ", reason='" + getReason() + "'" +
            ", insuranceChange='" + getInsuranceChange() + "'" +
            ", phoneNumber=" + getPhoneNumber() +
            "}";
    }
}
