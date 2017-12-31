/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MiniProjectTestModule } from '../../../test.module';
import { DataUploadDialogComponent } from '../../../../../../main/webapp/app/entities/data-upload/data-upload-dialog.component';
import { DataUploadService } from '../../../../../../main/webapp/app/entities/data-upload/data-upload.service';
import { DataUpload } from '../../../../../../main/webapp/app/entities/data-upload/data-upload.model';

describe('Component Tests', () => {

    describe('DataUpload Management Dialog Component', () => {
        let comp: DataUploadDialogComponent;
        let fixture: ComponentFixture<DataUploadDialogComponent>;
        let service: DataUploadService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MiniProjectTestModule],
                declarations: [DataUploadDialogComponent],
                providers: [
                    DataUploadService
                ]
            })
            .overrideTemplate(DataUploadDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataUploadDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataUploadService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DataUpload(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.dataUpload = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dataUploadListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DataUpload();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.dataUpload = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dataUploadListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
