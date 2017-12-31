import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DataUploadComponent } from './data-upload.component';
import { DataUploadDetailComponent } from './data-upload-detail.component';
import { DataUploadPopupComponent } from './data-upload-dialog.component';
import { DataUploadDeletePopupComponent } from './data-upload-delete-dialog.component';

export const dataUploadRoute: Routes = [
    {
        path: 'data-upload',
        component: DataUploadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataUploads'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'data-upload/:id',
        component: DataUploadDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataUploads'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataUploadPopupRoute: Routes = [
    {
        path: 'data-upload-new',
        component: DataUploadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataUploads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-upload/:id/edit',
        component: DataUploadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataUploads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-upload/:id/delete',
        component: DataUploadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataUploads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
