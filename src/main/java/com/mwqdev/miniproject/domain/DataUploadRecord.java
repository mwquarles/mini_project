package com.mwqdev.miniproject.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DataUploadRecord.
 */
@Entity
@Table(name = "data_upload_record")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DataUploadRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_record")
    private String dataRecord;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDataRecord() {
        return dataRecord;
    }

    public DataUploadRecord dataRecord(String dataRecord) {
        this.dataRecord = dataRecord;
        return this;
    }

    public void setDataRecord(String dataRecord) {
        this.dataRecord = dataRecord;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DataUploadRecord dataUploadRecord = (DataUploadRecord) o;
        if (dataUploadRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataUploadRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataUploadRecord{" +
            "id=" + getId() +
            ", dataRecord='" + getDataRecord() + "'" +
            "}";
    }
}
