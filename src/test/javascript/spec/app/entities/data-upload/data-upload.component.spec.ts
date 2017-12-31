/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { MiniProjectTestModule } from '../../../test.module';
import { DataUploadComponent } from '../../../../../../main/webapp/app/entities/data-upload/data-upload.component';
import { DataUploadService } from '../../../../../../main/webapp/app/entities/data-upload/data-upload.service';
import { DataUpload } from '../../../../../../main/webapp/app/entities/data-upload/data-upload.model';

describe('Component Tests', () => {

    describe('DataUpload Management Component', () => {
        let comp: DataUploadComponent;
        let fixture: ComponentFixture<DataUploadComponent>;
        let service: DataUploadService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MiniProjectTestModule],
                declarations: [DataUploadComponent],
                providers: [
                    DataUploadService
                ]
            })
            .overrideTemplate(DataUploadComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataUploadComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataUploadService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DataUpload(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dataUploads[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
