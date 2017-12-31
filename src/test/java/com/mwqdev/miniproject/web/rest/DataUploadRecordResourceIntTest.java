package com.mwqdev.miniproject.web.rest;

import com.mwqdev.miniproject.MiniProjectApp;

import com.mwqdev.miniproject.domain.DataUploadRecord;
import com.mwqdev.miniproject.repository.DataUploadRecordRepository;
import com.mwqdev.miniproject.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mwqdev.miniproject.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DataUploadRecordResource REST controller.
 *
 * @see DataUploadRecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MiniProjectApp.class)
public class DataUploadRecordResourceIntTest {

    private static final String DEFAULT_DATA_RECORD = "AAAAAAAAAA";
    private static final String UPDATED_DATA_RECORD = "BBBBBBBBBB";

    @Autowired
    private DataUploadRecordRepository dataUploadRecordRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataUploadRecordMockMvc;

    private DataUploadRecord dataUploadRecord;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataUploadRecordResource dataUploadRecordResource = new DataUploadRecordResource(dataUploadRecordRepository);
        this.restDataUploadRecordMockMvc = MockMvcBuilders.standaloneSetup(dataUploadRecordResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DataUploadRecord createEntity(EntityManager em) {
        DataUploadRecord dataUploadRecord = new DataUploadRecord()
            .dataRecord(DEFAULT_DATA_RECORD);
        return dataUploadRecord;
    }

    @Before
    public void initTest() {
        dataUploadRecord = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataUploadRecord() throws Exception {
        int databaseSizeBeforeCreate = dataUploadRecordRepository.findAll().size();

        // Create the DataUploadRecord
        restDataUploadRecordMockMvc.perform(post("/api/data-upload-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataUploadRecord)))
            .andExpect(status().isCreated());

        // Validate the DataUploadRecord in the database
        List<DataUploadRecord> dataUploadRecordList = dataUploadRecordRepository.findAll();
        assertThat(dataUploadRecordList).hasSize(databaseSizeBeforeCreate + 1);
        DataUploadRecord testDataUploadRecord = dataUploadRecordList.get(dataUploadRecordList.size() - 1);
        assertThat(testDataUploadRecord.getDataRecord()).isEqualTo(DEFAULT_DATA_RECORD);
    }

    @Test
    @Transactional
    public void createDataUploadRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataUploadRecordRepository.findAll().size();

        // Create the DataUploadRecord with an existing ID
        dataUploadRecord.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataUploadRecordMockMvc.perform(post("/api/data-upload-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataUploadRecord)))
            .andExpect(status().isBadRequest());

        // Validate the DataUploadRecord in the database
        List<DataUploadRecord> dataUploadRecordList = dataUploadRecordRepository.findAll();
        assertThat(dataUploadRecordList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDataUploadRecords() throws Exception {
        // Initialize the database
        dataUploadRecordRepository.saveAndFlush(dataUploadRecord);

        // Get all the dataUploadRecordList
        restDataUploadRecordMockMvc.perform(get("/api/data-upload-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataUploadRecord.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataRecord").value(hasItem(DEFAULT_DATA_RECORD.toString())));
    }

    @Test
    @Transactional
    public void getDataUploadRecord() throws Exception {
        // Initialize the database
        dataUploadRecordRepository.saveAndFlush(dataUploadRecord);

        // Get the dataUploadRecord
        restDataUploadRecordMockMvc.perform(get("/api/data-upload-records/{id}", dataUploadRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataUploadRecord.getId().intValue()))
            .andExpect(jsonPath("$.dataRecord").value(DEFAULT_DATA_RECORD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDataUploadRecord() throws Exception {
        // Get the dataUploadRecord
        restDataUploadRecordMockMvc.perform(get("/api/data-upload-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataUploadRecord() throws Exception {
        // Initialize the database
        dataUploadRecordRepository.saveAndFlush(dataUploadRecord);
        int databaseSizeBeforeUpdate = dataUploadRecordRepository.findAll().size();

        // Update the dataUploadRecord
        DataUploadRecord updatedDataUploadRecord = dataUploadRecordRepository.findOne(dataUploadRecord.getId());
        // Disconnect from session so that the updates on updatedDataUploadRecord are not directly saved in db
        em.detach(updatedDataUploadRecord);
        updatedDataUploadRecord
            .dataRecord(UPDATED_DATA_RECORD);

        restDataUploadRecordMockMvc.perform(put("/api/data-upload-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDataUploadRecord)))
            .andExpect(status().isOk());

        // Validate the DataUploadRecord in the database
        List<DataUploadRecord> dataUploadRecordList = dataUploadRecordRepository.findAll();
        assertThat(dataUploadRecordList).hasSize(databaseSizeBeforeUpdate);
        DataUploadRecord testDataUploadRecord = dataUploadRecordList.get(dataUploadRecordList.size() - 1);
        assertThat(testDataUploadRecord.getDataRecord()).isEqualTo(UPDATED_DATA_RECORD);
    }

    @Test
    @Transactional
    public void updateNonExistingDataUploadRecord() throws Exception {
        int databaseSizeBeforeUpdate = dataUploadRecordRepository.findAll().size();

        // Create the DataUploadRecord

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataUploadRecordMockMvc.perform(put("/api/data-upload-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataUploadRecord)))
            .andExpect(status().isCreated());

        // Validate the DataUploadRecord in the database
        List<DataUploadRecord> dataUploadRecordList = dataUploadRecordRepository.findAll();
        assertThat(dataUploadRecordList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDataUploadRecord() throws Exception {
        // Initialize the database
        dataUploadRecordRepository.saveAndFlush(dataUploadRecord);
        int databaseSizeBeforeDelete = dataUploadRecordRepository.findAll().size();

        // Get the dataUploadRecord
        restDataUploadRecordMockMvc.perform(delete("/api/data-upload-records/{id}", dataUploadRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DataUploadRecord> dataUploadRecordList = dataUploadRecordRepository.findAll();
        assertThat(dataUploadRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataUploadRecord.class);
        DataUploadRecord dataUploadRecord1 = new DataUploadRecord();
        dataUploadRecord1.setId(1L);
        DataUploadRecord dataUploadRecord2 = new DataUploadRecord();
        dataUploadRecord2.setId(dataUploadRecord1.getId());
        assertThat(dataUploadRecord1).isEqualTo(dataUploadRecord2);
        dataUploadRecord2.setId(2L);
        assertThat(dataUploadRecord1).isNotEqualTo(dataUploadRecord2);
        dataUploadRecord1.setId(null);
        assertThat(dataUploadRecord1).isNotEqualTo(dataUploadRecord2);
    }
}
