import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {AuthGuard} from './@core/services/_service/auth/auth.guard';
import { ListSupplierComponent } from './supplier/component/ListSupplier/ListSupplier.component';
import { EditSupplierComponent } from './supplier/component/Edit-Supplier/Edit-Supplier.component';
import { CreateSupplierComponent } from './supplier/component/create-supplier/create-supplier.component';
import { ListCustomerComponent } from './customer/component/listCustomer/listCustomer.component';
import { CreateCustomerComponent } from './customer/component/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './customer/component/update-customer/update-customer.component';

export const routes: Routes = [
  {
    path: 'pages',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then(m => m.NgxAuthModule),
  // },
  { path: '', redirectTo: 'pages', pathMatch: 'full'},
  { path: '**', redirectTo: 'error/404' },
  {
    path: 'supplier',
    component: ListSupplierComponent,
  },
  {
    path: 'supplier/:id',
    component: EditSupplierComponent,
  },
  {
    path: 'create-supplier',
    component: CreateSupplierComponent,
  },
  {
    path: 'customer',
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

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
