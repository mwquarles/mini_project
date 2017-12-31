import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MiniProjectDataUploadModule } from './data-upload/data-upload.module';
import { MiniProjectDataUploadRecordModule } from './data-upload-record/data-upload-record.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MiniProjectDataUploadModule,
        MiniProjectDataUploadRecordModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MiniProjectEntityModule {}
