import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { DataUpload } from './data-upload.model';
import { DataUploadService } from './data-upload.service';

@Component({
    selector: 'jhi-data-upload-detail',
    templateUrl: './data-upload-detail.component.html'
})
export class DataUploadDetailComponent implements OnInit, OnDestroy {

    dataUpload: DataUpload;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private dataUploadService: DataUploadService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDataUploads();
    }

    load(id) {
        this.dataUploadService.find(id).subscribe((dataUpload) => {
            this.dataUpload = dataUpload;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDataUploads() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dataUploadListModification',
            (response) => this.load(this.dataUpload.id)
        );
    }
}
