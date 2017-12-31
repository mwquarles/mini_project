import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { DataUpload } from './data-upload.model';
import { DataUploadPopupService } from './data-upload-popup.service';
import { DataUploadService } from './data-upload.service';

@Component({
    selector: 'jhi-data-upload-dialog',
    templateUrl: './data-upload-dialog.component.html'
})
export class DataUploadDialogComponent implements OnInit {

    dataUpload: DataUpload;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private dataUploadService: DataUploadService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dataUpload.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dataUploadService.update(this.dataUpload));
        } else {
            this.subscribeToSaveResponse(
                this.dataUploadService.create(this.dataUpload));
        }
    }

    private subscribeToSaveResponse(result: Observable<DataUpload>) {
        result.subscribe((res: DataUpload) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DataUpload) {
        this.eventManager.broadcast({ name: 'dataUploadListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-data-upload-popup',
    template: ''
})
export class DataUploadPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataUploadPopupService: DataUploadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dataUploadPopupService
                    .open(DataUploadDialogComponent as Component, params['id']);
            } else {
                this.dataUploadPopupService
                    .open(DataUploadDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
