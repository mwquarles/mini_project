package com.mwqdev.miniproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mwqdev.miniproject.domain.DataUploadRecord;

import com.mwqdev.miniproject.repository.DataUploadRecordRepository;
import com.mwqdev.miniproject.web.rest.errors.BadRequestAlertException;
import com.mwqdev.miniproject.web.rest.util.HeaderUtil;
import com.mwqdev.miniproject.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DataUploadRecord.
 */
@RestController
@RequestMapping("/api")
public class DataUploadRecordResource {

    private final Logger log = LoggerFactory.getLogger(DataUploadRecordResource.class);

    private static final String ENTITY_NAME = "dataUploadRecord";

    private final DataUploadRecordRepository dataUploadRecordRepository;

    public DataUploadRecordResource(DataUploadRecordRepository dataUploadRecordRepository) {
        this.dataUploadRecordRepository = dataUploadRecordRepository;
    }

    /**
     * POST  /data-upload-records : Create a new dataUploadRecord.
     *
     * @param dataUploadRecord the dataUploadRecord to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataUploadRecord, or with status 400 (Bad Request) if the dataUploadRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data-upload-records")
    @Timed
    public ResponseEntity<DataUploadRecord> createDataUploadRecord(@RequestBody DataUploadRecord dataUploadRecord) throws URISyntaxException {
        log.debug("REST request to save DataUploadRecord : {}", dataUploadRecord);
        if (dataUploadRecord.getId() != null) {
            throw new BadRequestAlertException("A new dataUploadRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DataUploadRecord result = dataUploadRecordRepository.save(dataUploadRecord);
        return ResponseEntity.created(new URI("/api/data-upload-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data-upload-records : Updates an existing dataUploadRecord.
     *
     * @param dataUploadRecord the dataUploadRecord to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataUploadRecord,
     * or with status 400 (Bad Request) if the dataUploadRecord is not valid,
     * or with status 500 (Internal Server Error) if the dataUploadRecord couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data-upload-records")
    @Timed
    public ResponseEntity<DataUploadRecord> updateDataUploadRecord(@RequestBody DataUploadRecord dataUploadRecord) throws URISyntaxException {
        log.debug("REST request to update DataUploadRecord : {}", dataUploadRecord);
        if (dataUploadRecord.getId() == null) {
            return createDataUploadRecord(dataUploadRecord);
        }
        DataUploadRecord result = dataUploadRecordRepository.save(dataUploadRecord);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataUploadRecord.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data-upload-records : get all the dataUploadRecords.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of dataUploadRecords in body
     */
    @GetMapping("/data-upload-records")
    @Timed
    public ResponseEntity<List<DataUploadRecord>> getAllDataUploadRecords(Pageable pageable) {
        log.debug("REST request to get a page of DataUploadRecords");
        Page<DataUploadRecord> page = dataUploadRecordRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/data-upload-records");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /data-upload-records/:id : get the "id" dataUploadRecord.
     *
     * @param id the id of the dataUploadRecord to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataUploadRecord, or with status 404 (Not Found)
     */
    @GetMapping("/data-upload-records/{id}")
    @Timed
    public ResponseEntity<DataUploadRecord> getDataUploadRecord(@PathVariable Long id) {
        log.debug("REST request to get DataUploadRecord : {}", id);
        DataUploadRecord dataUploadRecord = dataUploadRecordRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dataUploadRecord));
    }

    /**
     * DELETE  /data-upload-records/:id : delete the "id" dataUploadRecord.
     *
     * @param id the id of the dataUploadRecord to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data-upload-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteDataUploadRecord(@PathVariable Long id) {
        log.debug("REST request to delete DataUploadRecord : {}", id);
        dataUploadRecordRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
