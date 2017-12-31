/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { MiniProjectTestModule } from '../../../test.module';
import { DataUploadDetailComponent } from '../../../../../../main/webapp/app/entities/data-upload/data-upload-detail.component';
import { DataUploadService } from '../../../../../../main/webapp/app/entities/data-upload/data-upload.service';
import { DataUpload } from '../../../../../../main/webapp/app/entities/data-upload/data-upload.model';

describe('Component Tests', () => {

    describe('DataUpload Management Detail Component', () => {
        let comp: DataUploadDetailComponent;
        let fixture: ComponentFixture<DataUploadDetailComponent>;
        let service: DataUploadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MiniProjectTestModule],
                declarations: [DataUploadDetailComponent],
                providers: [
                    DataUploadService
                ]
            })
            .overrideTemplate(DataUploadDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataUploadDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataUploadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DataUpload(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dataUpload).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
