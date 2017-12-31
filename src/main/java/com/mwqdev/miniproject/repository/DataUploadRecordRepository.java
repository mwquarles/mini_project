package com.mwqdev.miniproject.repository;

import com.mwqdev.miniproject.domain.DataUploadRecord;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DataUploadRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataUploadRecordRepository extends JpaRepository<DataUploadRecord, Long> {

}
