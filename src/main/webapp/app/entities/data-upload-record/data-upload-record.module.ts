import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MiniProjectSharedModule } from '../../shared';
import {
    DataUploadRecordService,
    DataUploadRecordPopupService,
    DataUploadRecordComponent,
    DataUploadRecordDetailComponent,
    DataUploadRecordDialogComponent,
    DataUploadRecordPopupComponent,
    DataUploadRecordDeletePopupComponent,
    DataUploadRecordDeleteDialogComponent,
    dataUploadRecordRoute,
    dataUploadRecordPopupRoute,
    DataUploadRecordResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dataUploadRecordRoute,
    ...dataUploadRecordPopupRoute,
];

@NgModule({
    imports: [
        MiniProjectSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataUploadRecordComponent,
        DataUploadRecordDetailComponent,
        DataUploadRecordDialogComponent,
        DataUploadRecordDeleteDialogComponent,
        DataUploadRecordPopupComponent,
        DataUploadRecordDeletePopupComponent,
    ],
    entryComponents: [
        DataUploadRecordComponent,
        DataUploadRecordDialogComponent,
        DataUploadRecordPopupComponent,
        DataUploadRecordDeleteDialogComponent,
        DataUploadRecordDeletePopupComponent,
    ],
    providers: [
        DataUploadRecordService,
        DataUploadRecordPopupService,
        DataUploadRecordResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MiniProjectDataUploadRecordModule {}
