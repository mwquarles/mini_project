import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DataUploadRecordComponent } from './data-upload-record.component';
import { DataUploadRecordDetailComponent } from './data-upload-record-detail.component';
import { DataUploadRecordPopupComponent } from './data-upload-record-dialog.component';
import { DataUploadRecordDeletePopupComponent } from './data-upload-record-delete-dialog.component';

@Injectable()
export class DataUploadRecordResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const dataUploadRecordRoute: Routes = [
    {
        path: 'data-upload-record',
        component: DataUploadRecordComponent,
        resolve: {
            'pagingParams': DataUploadRecordResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataUploadRecords'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'data-upload-record/:id',
        component: DataUploadRecordDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataUploadRecords'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataUploadRecordPopupRoute: Routes = [
    {
        path: 'data-upload-record-new',
        component: DataUploadRecordPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataUploadRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-upload-record/:id/edit',
        component: DataUploadRecordPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataUploadRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-upload-record/:id/delete',
        component: DataUploadRecordDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataUploadRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
