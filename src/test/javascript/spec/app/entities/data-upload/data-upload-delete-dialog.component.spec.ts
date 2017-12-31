/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MiniProjectTestModule } from '../../../test.module';
import { DataUploadDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/data-upload/data-upload-delete-dialog.component';
import { DataUploadService } from '../../../../../../main/webapp/app/entities/data-upload/data-upload.service';

describe('Component Tests', () => {

    describe('DataUpload Management Delete Component', () => {
        let comp: DataUploadDeleteDialogComponent;
        let fixture: ComponentFixture<DataUploadDeleteDialogComponent>;
        let service: DataUploadService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MiniProjectTestModule],
                declarations: [DataUploadDeleteDialogComponent],
                providers: [
                    DataUploadService
                ]
            })
            .overrideTemplate(DataUploadDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataUploadDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataUploadService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
