import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from '../product/product.component';
import {ListSupplierComponent} from './ListSupplier/ListSupplier.component';


const routes: Routes = [
  {
    // localhost:4200/pages/products
    path: '',
    component: ListSupplierComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
})
export class SupplierModule {
}
