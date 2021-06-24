import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListCustomerComponent} from './component/listCustomer/listCustomer.component';
import {CreateCustomerComponent} from './component/create-customer/create-customer.component';
import {UpdateCustomerComponent} from './component/update-customer/update-customer.component';
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: ListCustomerComponent,
  },
  {
    path: 'create-customer',
    component: CreateCustomerComponent,
  },
  {
    path: 'update-customer/:id',
    component: UpdateCustomerComponent,
  },
];

@NgModule({
  declarations: [ListCustomerComponent, UpdateCustomerComponent, CreateCustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class CustomerModule { }
