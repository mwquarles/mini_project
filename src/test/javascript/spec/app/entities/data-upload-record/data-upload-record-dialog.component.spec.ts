/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MiniProjectTestModule } from '../../../test.module';
import { DataUploadRecordDialogComponent } from '../../../../../../main/webapp/app/entities/data-upload-record/data-upload-record-dialog.component';
import { DataUploadRecordService } from '../../../../../../main/webapp/app/entities/data-upload-record/data-upload-record.service';
import { DataUploadRecord } from '../../../../../../main/webapp/app/entities/data-upload-record/data-upload-record.model';

describe('Component Tests', () => {

    describe('DataUploadRecord Management Dialog Component', () => {
        let comp: DataUploadRecordDialogComponent;
        let fixture: ComponentFixture<DataUploadRecordDialogComponent>;
        let service: DataUploadRecordService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MiniProjectTestModule],
                declarations: [DataUploadRecordDialogComponent],
                providers: [
                    DataUploadRecordService
                ]
            })
            .overrideTemplate(DataUploadRecordDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataUploadRecordDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataUploadRecordService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DataUploadRecord(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.dataUploadRecord = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dataUploadRecordListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DataUploadRecord();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.dataUploadRecord = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dataUploadRecordListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
