import { BaseEntity } from './../../shared';

export class DataUploadRecord implements BaseEntity {
    constructor(
        public id?: number,
        public dataRecord?: string,
    ) {
    }
}
