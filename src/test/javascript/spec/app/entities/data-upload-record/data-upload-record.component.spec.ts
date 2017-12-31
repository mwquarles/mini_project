/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { MiniProjectTestModule } from '../../../test.module';
import { DataUploadRecordComponent } from '../../../../../../main/webapp/app/entities/data-upload-record/data-upload-record.component';
import { DataUploadRecordService } from '../../../../../../main/webapp/app/entities/data-upload-record/data-upload-record.service';
import { DataUploadRecord } from '../../../../../../main/webapp/app/entities/data-upload-record/data-upload-record.model';

describe('Component Tests', () => {

    describe('DataUploadRecord Management Component', () => {
        let comp: DataUploadRecordComponent;
        let fixture: ComponentFixture<DataUploadRecordComponent>;
        let service: DataUploadRecordService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MiniProjectTestModule],
                declarations: [DataUploadRecordComponent],
                providers: [
                    DataUploadRecordService
                ]
            })
            .overrideTemplate(DataUploadRecordComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataUploadRecordComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataUploadRecordService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DataUploadRecord(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dataUploadRecords[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
