import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { DataUpload } from './data-upload.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DataUploadService {

    private resourceUrl = SERVER_API_URL + 'api/data-uploads';

    constructor(private http: Http) { }

    create(dataUpload: DataUpload): Observable<DataUpload> {
        const copy = this.convert(dataUpload);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dataUpload: DataUpload): Observable<DataUpload> {
        const copy = this.convert(dataUpload);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DataUpload> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to DataUpload.
     */
    private convertItemFromServer(json: any): DataUpload {
        const entity: DataUpload = Object.assign(new DataUpload(), json);
        return entity;
    }

    /**
     * Convert a DataUpload to a JSON which can be sent to the server.
     */
    private convert(dataUpload: DataUpload): DataUpload {
        const copy: DataUpload = Object.assign({}, dataUpload);
        return copy;
    }
}
