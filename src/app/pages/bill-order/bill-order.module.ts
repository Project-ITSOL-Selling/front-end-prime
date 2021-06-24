import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BillOrderComponent} from './bill-order.component';
import {PortletModule} from '../../shares/portlet/portlet.module';
import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ActionBillOrderComponent} from './action-bill-order/action-bill-order/action-bill-order.component';
import {DeleteBillOrderComponent} from './delete-bill-order/delete-bill-order.component';
import {CalendarModule} from 'primeng/calendar';
import {NgxSpinnerModule} from 'ngx-spinner';


const routes: Routes = [
  {
    path: '',
    component: BillOrderComponent,
  },
];

@NgModule({
  declarations: [
    ActionBillOrderComponent,
    DeleteBillOrderComponent,
    BillOrderComponent,
  ],
  imports: [
    CommonModule,
    PortletModule,
    TooltipModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
  ],
})
export class BillOrderModule {
}
