import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import {ProductComponent} from '../product/product.component';
import {RouterModule, Routes} from '@angular/router';
import {PortletModule} from "../../shares/portlet/portlet.module";
import {TooltipModule} from "primeng/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {TableModule} from "primeng/table";
import { ActionSupplierComponent } from './action-supplier/action-supplier.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import { DeleteSupplierComponent } from './delete-supplier/delete-supplier.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierComponent,
  },
];
@NgModule({
  declarations: [SupplierComponent, ActionSupplierComponent, DeleteSupplierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PortletModule,
    TooltipModule,
    TranslateModule,
    TableModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
})
export class SupplierModule { }
