/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { MiniProjectTestModule } from '../../../test.module';
import { DataUploadRecordDetailComponent } from '../../../../../../main/webapp/app/entities/data-upload-record/data-upload-record-detail.component';
import { DataUploadRecordService } from '../../../../../../main/webapp/app/entities/data-upload-record/data-upload-record.service';
import { DataUploadRecord } from '../../../../../../main/webapp/app/entities/data-upload-record/data-upload-record.model';

describe('Component Tests', () => {

    describe('DataUploadRecord Management Detail Component', () => {
        let comp: DataUploadRecordDetailComponent;
        let fixture: ComponentFixture<DataUploadRecordDetailComponent>;
        let service: DataUploadRecordService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MiniProjectTestModule],
                declarations: [DataUploadRecordDetailComponent],
                providers: [
                    DataUploadRecordService
                ]
            })
            .overrideTemplate(DataUploadRecordDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataUploadRecordDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataUploadRecordService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DataUploadRecord(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dataUploadRecord).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
