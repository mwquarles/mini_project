import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataUpload } from './data-upload.model';
import { DataUploadPopupService } from './data-upload-popup.service';
import { DataUploadService } from './data-upload.service';

@Component({
    selector: 'jhi-data-upload-delete-dialog',
    templateUrl: './data-upload-delete-dialog.component.html'
})
export class DataUploadDeleteDialogComponent {

    dataUpload: DataUpload;

    constructor(
        private dataUploadService: DataUploadService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataUploadService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dataUploadListModification',
                content: 'Deleted an dataUpload'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-upload-delete-popup',
    template: ''
})
export class DataUploadDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataUploadPopupService: DataUploadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dataUploadPopupService
                .open(DataUploadDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
