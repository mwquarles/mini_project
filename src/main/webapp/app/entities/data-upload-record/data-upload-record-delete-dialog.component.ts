import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataUploadRecord } from './data-upload-record.model';
import { DataUploadRecordPopupService } from './data-upload-record-popup.service';
import { DataUploadRecordService } from './data-upload-record.service';

@Component({
    selector: 'jhi-data-upload-record-delete-dialog',
    templateUrl: './data-upload-record-delete-dialog.component.html'
})
export class DataUploadRecordDeleteDialogComponent {

    dataUploadRecord: DataUploadRecord;

    constructor(
        private dataUploadRecordService: DataUploadRecordService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataUploadRecordService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dataUploadRecordListModification',
                content: 'Deleted an dataUploadRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-upload-record-delete-popup',
    template: ''
})
export class DataUploadRecordDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataUploadRecordPopupService: DataUploadRecordPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dataUploadRecordPopupService
                .open(DataUploadRecordDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
