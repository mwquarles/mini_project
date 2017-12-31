import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { MiniProjectSharedModule, UserRouteAccessService } from './shared';
import { MiniProjectAppRoutingModule} from './app-routing.module';
import { MiniProjectHomeModule } from './home/home.module';
import { MiniProjectAdminModule } from './admin/admin.module';
import { MiniProjectAccountModule } from './account/account.module';
import { MiniProjectEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        MiniProjectAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        MiniProjectSharedModule,
        MiniProjectHomeModule,
        MiniProjectAdminModule,
        MiniProjectAccountModule,
        MiniProjectEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class MiniProjectAppModule {}
