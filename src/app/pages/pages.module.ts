import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ProductComponent} from './product/product.component';
import {PortletModule} from '../shares/portlet/portlet.module';
import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { ActionBillDetailComponent } from './bill-detail/action-bill-detail/action-bill-detail.component';
import { DeleteBillDetailComponent } from './bill-detail/delete-bill-detail/delete-bill-detail.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import {CalendarModule} from 'primeng/calendar';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DropdownModule} from 'primeng/dropdown';


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    PortletModule,
    TooltipModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    NgxSpinnerModule,
    DropdownModule,
  ],
  declarations: [
    PagesComponent,
    ProductComponent,
    ActionBillDetailComponent,
    DeleteBillDetailComponent,
    BillDetailComponent,
    // StoreComponent,
  ],
})
export class PagesModule {
}
