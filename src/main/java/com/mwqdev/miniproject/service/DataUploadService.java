package com.mwqdev.miniproject.service;

import com.mwqdev.miniproject.domain.DataUpload;
import com.mwqdev.miniproject.domain.DataUploadRecord;
import com.mwqdev.miniproject.repository.DataUploadRecordRepository;
import com.mwqdev.miniproject.repository.DataUploadRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

/**
 * Service Implementation for managing DataUpload.
 */
@Service
@Transactional
public class DataUploadService {

    private final Logger log = LoggerFactory.getLogger(DataUploadService.class);

    private final DataUploadRepository dataUploadRepository;

    private final DataUploadRecordRepository dataUploadRecordRepository;

    public DataUploadService(DataUploadRepository dataUploadRepository, DataUploadRecordRepository dataUploadRecordRepository) {
        this.dataUploadRepository = dataUploadRepository;
        this.dataUploadRecordRepository = dataUploadRecordRepository;
    }

    /**
     * Save a dataUpload.
     *
     * @param dataUpload the entity to save
     * @return the persisted entity
     */
    public DataUpload save(DataUpload dataUpload) {
        log.debug("Request to save DataUpload : {}", dataUpload);

        // Get CSV as string
        String csvString = dataUpload.getCsvUploadString();

        // Convert CSV string to array list at new lines
        List<String> recordList = Arrays.asList(csvString.split("\\r?\\n"));

        /*
        Create record for each item in list and save
        TODO figure out how to add columns from CSV headers - ignore for now
        */

        for (int i = 1; i < recordList.size(); i++) {

            // Split item by commas
            List<String> recordItem = Arrays.asList(recordList.get(i).split(","));

            // Convert to string
            String newRecord = String.valueOf(recordItem);

            DataUploadRecord newDataUploadRecord = new DataUploadRecord();

            // Remove array brackets and create record
            newDataUploadRecord.dataRecord(newRecord.substring(1, newRecord.length() - 1));

            // Save to db
            dataUploadRecordRepository.save(newDataUploadRecord);

        }

        return dataUploadRepository.save(dataUpload);
    }

    /**
     * Get all the dataUploads.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DataUpload> findAll() {
        log.debug("Request to get all DataUploads");
        return dataUploadRepository.findAll();
    }

    /**
     * Get one dataUpload by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DataUpload findOne(Long id) {
        log.debug("Request to get DataUpload : {}", id);
        return dataUploadRepository.findOne(id);
    }

    /**
     * Delete the dataUpload by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DataUpload : {}", id);
        dataUploadRepository.delete(id);
    }
}
