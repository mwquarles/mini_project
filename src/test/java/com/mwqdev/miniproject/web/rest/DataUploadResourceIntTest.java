package com.mwqdev.miniproject.web.rest;

import com.mwqdev.miniproject.MiniProjectApp;

import com.mwqdev.miniproject.domain.DataUpload;
import com.mwqdev.miniproject.repository.DataUploadRepository;
import com.mwqdev.miniproject.service.DataUploadService;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mwqdev.miniproject.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DataUploadResource REST controller.
 *
 * @see DataUploadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MiniProjectApp.class)
public class DataUploadResourceIntTest {

    private static final byte[] DEFAULT_CSV_UPLOAD = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CSV_UPLOAD = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_CSV_UPLOAD_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CSV_UPLOAD_CONTENT_TYPE = "image/png";

    @Autowired
    private DataUploadRepository dataUploadRepository;

    @Autowired
    private DataUploadService dataUploadService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataUploadMockMvc;

    private DataUpload dataUpload;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataUploadResource dataUploadResource = new DataUploadResource(dataUploadService);
        this.restDataUploadMockMvc = MockMvcBuilders.standaloneSetup(dataUploadResource)
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
    public static DataUpload createEntity(EntityManager em) {
        DataUpload dataUpload = new DataUpload()
            .csvUpload(DEFAULT_CSV_UPLOAD)
            .csvUploadContentType(DEFAULT_CSV_UPLOAD_CONTENT_TYPE);
        return dataUpload;
    }

    @Before
    public void initTest() {
        dataUpload = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataUpload() throws Exception {
        int databaseSizeBeforeCreate = dataUploadRepository.findAll().size();

        // Create the DataUpload
        restDataUploadMockMvc.perform(post("/api/data-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataUpload)))
            .andExpect(status().isCreated());

        // Validate the DataUpload in the database
        List<DataUpload> dataUploadList = dataUploadRepository.findAll();
        assertThat(dataUploadList).hasSize(databaseSizeBeforeCreate + 1);
        DataUpload testDataUpload = dataUploadList.get(dataUploadList.size() - 1);
        assertThat(testDataUpload.getCsvUpload()).isEqualTo(DEFAULT_CSV_UPLOAD);
        assertThat(testDataUpload.getCsvUploadContentType()).isEqualTo(DEFAULT_CSV_UPLOAD_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createDataUploadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataUploadRepository.findAll().size();

        // Create the DataUpload with an existing ID
        dataUpload.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataUploadMockMvc.perform(post("/api/data-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataUpload)))
            .andExpect(status().isBadRequest());

        // Validate the DataUpload in the database
        List<DataUpload> dataUploadList = dataUploadRepository.findAll();
        assertThat(dataUploadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCsvUploadIsRequired() throws Exception {
        int databaseSizeBeforeTest = dataUploadRepository.findAll().size();
        // set the field null
        dataUpload.setCsvUpload(null);

        // Create the DataUpload, which fails.

        restDataUploadMockMvc.perform(post("/api/data-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataUpload)))
            .andExpect(status().isBadRequest());

        List<DataUpload> dataUploadList = dataUploadRepository.findAll();
        assertThat(dataUploadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDataUploads() throws Exception {
        // Initialize the database
        dataUploadRepository.saveAndFlush(dataUpload);

        // Get all the dataUploadList
        restDataUploadMockMvc.perform(get("/api/data-uploads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataUpload.getId().intValue())))
            .andExpect(jsonPath("$.[*].csvUploadContentType").value(hasItem(DEFAULT_CSV_UPLOAD_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].csvUpload").value(hasItem(Base64Utils.encodeToString(DEFAULT_CSV_UPLOAD))));
    }

    @Test
    @Transactional
    public void getDataUpload() throws Exception {
        // Initialize the database
        dataUploadRepository.saveAndFlush(dataUpload);

        // Get the dataUpload
        restDataUploadMockMvc.perform(get("/api/data-uploads/{id}", dataUpload.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataUpload.getId().intValue()))
            .andExpect(jsonPath("$.csvUploadContentType").value(DEFAULT_CSV_UPLOAD_CONTENT_TYPE))
            .andExpect(jsonPath("$.csvUpload").value(Base64Utils.encodeToString(DEFAULT_CSV_UPLOAD)));
    }

    @Test
    @Transactional
    public void getNonExistingDataUpload() throws Exception {
        // Get the dataUpload
        restDataUploadMockMvc.perform(get("/api/data-uploads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataUpload() throws Exception {
        // Initialize the database
        dataUploadService.save(dataUpload);

        int databaseSizeBeforeUpdate = dataUploadRepository.findAll().size();

        // Update the dataUpload
        DataUpload updatedDataUpload = dataUploadRepository.findOne(dataUpload.getId());
        // Disconnect from session so that the updates on updatedDataUpload are not directly saved in db
        em.detach(updatedDataUpload);
        updatedDataUpload
            .csvUpload(UPDATED_CSV_UPLOAD)
            .csvUploadContentType(UPDATED_CSV_UPLOAD_CONTENT_TYPE);

        restDataUploadMockMvc.perform(put("/api/data-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDataUpload)))
            .andExpect(status().isOk());

        // Validate the DataUpload in the database
        List<DataUpload> dataUploadList = dataUploadRepository.findAll();
        assertThat(dataUploadList).hasSize(databaseSizeBeforeUpdate);
        DataUpload testDataUpload = dataUploadList.get(dataUploadList.size() - 1);
        assertThat(testDataUpload.getCsvUpload()).isEqualTo(UPDATED_CSV_UPLOAD);
        assertThat(testDataUpload.getCsvUploadContentType()).isEqualTo(UPDATED_CSV_UPLOAD_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingDataUpload() throws Exception {
        int databaseSizeBeforeUpdate = dataUploadRepository.findAll().size();

        // Create the DataUpload

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataUploadMockMvc.perform(put("/api/data-uploads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataUpload)))
            .andExpect(status().isCreated());

        // Validate the DataUpload in the database
        List<DataUpload> dataUploadList = dataUploadRepository.findAll();
        assertThat(dataUploadList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDataUpload() throws Exception {
        // Initialize the database
        dataUploadService.save(dataUpload);

        int databaseSizeBeforeDelete = dataUploadRepository.findAll().size();

        // Get the dataUpload
        restDataUploadMockMvc.perform(delete("/api/data-uploads/{id}", dataUpload.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DataUpload> dataUploadList = dataUploadRepository.findAll();
        assertThat(dataUploadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataUpload.class);
        DataUpload dataUpload1 = new DataUpload();
        dataUpload1.setId(1L);
        DataUpload dataUpload2 = new DataUpload();
        dataUpload2.setId(dataUpload1.getId());
        assertThat(dataUpload1).isEqualTo(dataUpload2);
        dataUpload2.setId(2L);
        assertThat(dataUpload1).isNotEqualTo(dataUpload2);
        dataUpload1.setId(null);
        assertThat(dataUpload1).isNotEqualTo(dataUpload2);
    }
}
