package com.mwqdev.miniproject.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DataUpload.
 */
@Entity
@Table(name = "data_upload")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DataUpload implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Lob
    @Column(name = "csv_upload", nullable = false)
    private byte[] csvUpload;

    @Column(name = "csv_upload_content_type", nullable = false)
    private String csvUploadContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getCsvUpload() {
        return csvUpload;
    }

    public DataUpload csvUpload(byte[] csvUpload) {
        this.csvUpload = csvUpload;
        return this;
    }

    // Convert CSV byte code to string
    public String getCsvUploadString() {
        byte[] csvByte = getCsvUpload();
        String csvString = new String(csvByte);
        return csvString;
    }

    public void setCsvUpload(byte[] csvUpload) {
        this.csvUpload = csvUpload;
    }

    public String getCsvUploadContentType() {
        return csvUploadContentType;
    }

    public DataUpload csvUploadContentType(String csvUploadContentType) {
        this.csvUploadContentType = csvUploadContentType;
        return this;
    }

    public void setCsvUploadContentType(String csvUploadContentType) {
        this.csvUploadContentType = csvUploadContentType;
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
        DataUpload dataUpload = (DataUpload) o;
        if (dataUpload.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataUpload.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataUpload{" +
            "id=" + getId() +
            ", csvUpload='" + getCsvUpload() + "'" +
            ", csvUploadContentType='" + getCsvUploadContentType() + "'" +
            "}";
    }
}
