package com.mwqdev.miniproject.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mwqdev.miniproject.domain.DataUpload;
import com.mwqdev.miniproject.service.DataUploadService;
import com.mwqdev.miniproject.web.rest.errors.BadRequestAlertException;
import com.mwqdev.miniproject.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DataUpload.
 */
@RestController
@RequestMapping("/api")
public class DataUploadResource {

    private final Logger log = LoggerFactory.getLogger(DataUploadResource.class);

    private static final String ENTITY_NAME = "dataUpload";

    private final DataUploadService dataUploadService;

    public DataUploadResource(DataUploadService dataUploadService) {
        this.dataUploadService = dataUploadService;
    }

    /**
     * POST  /data-uploads : Create a new dataUpload.
     *
     * @param dataUpload the dataUpload to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataUpload, or with status 400 (Bad Request) if the dataUpload has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data-uploads")
    @Timed
    public ResponseEntity<DataUpload> createDataUpload(@Valid @RequestBody DataUpload dataUpload) throws URISyntaxException {
        log.debug("REST request to save DataUpload : {}", dataUpload);
        if (dataUpload.getId() != null) {
            throw new BadRequestAlertException("A new dataUpload cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DataUpload result = dataUploadService.save(dataUpload);
        return ResponseEntity.created(new URI("/api/data-uploads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data-uploads : Updates an existing dataUpload.
     *
     * @param dataUpload the dataUpload to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataUpload,
     * or with status 400 (Bad Request) if the dataUpload is not valid,
     * or with status 500 (Internal Server Error) if the dataUpload couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data-uploads")
    @Timed
    public ResponseEntity<DataUpload> updateDataUpload(@Valid @RequestBody DataUpload dataUpload) throws URISyntaxException {
        log.debug("REST request to update DataUpload : {}", dataUpload);
        if (dataUpload.getId() == null) {
            return createDataUpload(dataUpload);
        }
        DataUpload result = dataUploadService.save(dataUpload);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataUpload.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data-uploads : get all the dataUploads.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dataUploads in body
     */
    @GetMapping("/data-uploads")
    @Timed
    public List<DataUpload> getAllDataUploads() {
        log.debug("REST request to get all DataUploads");
        return dataUploadService.findAll();
        }

    /**
     * GET  /data-uploads/:id : get the "id" dataUpload.
     *
     * @param id the id of the dataUpload to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataUpload, or with status 404 (Not Found)
     */
    @GetMapping("/data-uploads/{id}")
    @Timed
    public ResponseEntity<DataUpload> getDataUpload(@PathVariable Long id) {
        log.debug("REST request to get DataUpload : {}", id);
        DataUpload dataUpload = dataUploadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dataUpload));
    }

    /**
     * DELETE  /data-uploads/:id : delete the "id" dataUpload.
     *
     * @param id the id of the dataUpload to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data-uploads/{id}")
    @Timed
    public ResponseEntity<Void> deleteDataUpload(@PathVariable Long id) {
        log.debug("REST request to delete DataUpload : {}", id);
        dataUploadService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
