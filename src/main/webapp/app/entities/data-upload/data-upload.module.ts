import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MiniProjectSharedModule } from '../../shared';
import {
    DataUploadService,
    DataUploadPopupService,
    DataUploadComponent,
    DataUploadDetailComponent,
    DataUploadDialogComponent,
    DataUploadPopupComponent,
    DataUploadDeletePopupComponent,
    DataUploadDeleteDialogComponent,
    dataUploadRoute,
    dataUploadPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dataUploadRoute,
    ...dataUploadPopupRoute,
];

@NgModule({
    imports: [
        MiniProjectSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataUploadComponent,
        DataUploadDetailComponent,
        DataUploadDialogComponent,
        DataUploadDeleteDialogComponent,
        DataUploadPopupComponent,
        DataUploadDeletePopupComponent,
    ],
    entryComponents: [
        DataUploadComponent,
        DataUploadDialogComponent,
        DataUploadPopupComponent,
        DataUploadDeleteDialogComponent,
        DataUploadDeletePopupComponent,
    ],
    providers: [
        DataUploadService,
        DataUploadPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MiniProjectDataUploadModule {}
