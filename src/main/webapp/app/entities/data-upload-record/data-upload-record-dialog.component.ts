import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataUploadRecord } from './data-upload-record.model';
import { DataUploadRecordPopupService } from './data-upload-record-popup.service';
import { DataUploadRecordService } from './data-upload-record.service';

@Component({
    selector: 'jhi-data-upload-record-dialog',
    templateUrl: './data-upload-record-dialog.component.html'
})
export class DataUploadRecordDialogComponent implements OnInit {

    dataUploadRecord: DataUploadRecord;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUploadRecordService: DataUploadRecordService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dataUploadRecord.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dataUploadRecordService.update(this.dataUploadRecord));
        } else {
            this.subscribeToSaveResponse(
                this.dataUploadRecordService.create(this.dataUploadRecord));
        }
    }

    private subscribeToSaveResponse(result: Observable<DataUploadRecord>) {
        result.subscribe((res: DataUploadRecord) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DataUploadRecord) {
        this.eventManager.broadcast({ name: 'dataUploadRecordListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-data-upload-record-popup',
    template: ''
})
export class DataUploadRecordPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataUploadRecordPopupService: DataUploadRecordPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dataUploadRecordPopupService
                    .open(DataUploadRecordDialogComponent as Component, params['id']);
            } else {
                this.dataUploadRecordPopupService
                    .open(DataUploadRecordDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
