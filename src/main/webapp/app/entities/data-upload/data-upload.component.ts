import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { DataUpload } from './data-upload.model';
import { DataUploadService } from './data-upload.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-data-upload',
    templateUrl: './data-upload.component.html'
})
export class DataUploadComponent implements OnInit, OnDestroy {
dataUploads: DataUpload[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dataUploadService: DataUploadService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dataUploadService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dataUploads = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDataUploads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DataUpload) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInDataUploads() {
        this.eventSubscriber = this.eventManager.subscribe('dataUploadListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
