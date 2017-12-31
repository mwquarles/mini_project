import { BaseEntity } from './../../shared';

export class DataUpload implements BaseEntity {
    constructor(
        public id?: number,
        public csvUploadContentType?: string,
        public csvUpload?: any,
    ) {
    }
}
