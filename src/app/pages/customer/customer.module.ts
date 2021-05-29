import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerComponent} from './customer.component';
import {RouterModule, Routes} from '@angular/router';
import {PortletModule} from '../../shares/portlet/portlet.module';
import {TooltipModule} from 'primeng/tooltip';
import {TranslateModule} from '@ngx-translate/core';
import {TabMenuModule} from 'primeng/tabmenu';
import {CustomerTravelComponent} from './customer-travel/customer-travel.component';
import {CustomerPostalComponent} from './customer-postal/customer-postal.component';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import { ActionTravelComponent } from './customer-travel/action-travel/action-travel.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import { DeleteTravelComponent } from './customer-travel/delete-travel/delete-travel.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
  },
];

@NgModule({
  declarations: [CustomerComponent, CustomerTravelComponent, CustomerPostalComponent, ActionTravelComponent, DeleteTravelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PortletModule,
    TooltipModule,
    TranslateModule,
    TabMenuModule,
    TabViewModule,
    TableModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
  ],
})
export class CustomerModule {
}
