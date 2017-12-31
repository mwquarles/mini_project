import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DataUploadRecord } from './data-upload-record.model';
import { DataUploadRecordService } from './data-upload-record.service';

@Component({
    selector: 'jhi-data-upload-record-detail',
    templateUrl: './data-upload-record-detail.component.html'
})
export class DataUploadRecordDetailComponent implements OnInit, OnDestroy {

    dataUploadRecord: DataUploadRecord;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUploadRecordService: DataUploadRecordService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDataUploadRecords();
    }

    load(id) {
        this.dataUploadRecordService.find(id).subscribe((dataUploadRecord) => {
            this.dataUploadRecord = dataUploadRecord;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDataUploadRecords() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dataUploadRecordListModification',
            (response) => this.load(this.dataUploadRecord.id)
        );
    }
}
