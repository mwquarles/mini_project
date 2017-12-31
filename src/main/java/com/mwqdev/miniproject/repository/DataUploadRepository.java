package com.mwqdev.miniproject.repository;

import com.mwqdev.miniproject.domain.DataUpload;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DataUpload entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataUploadRepository extends JpaRepository<DataUpload, Long> {

}
