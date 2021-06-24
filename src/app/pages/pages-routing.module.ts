import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'products',
      loadChildren: () => import('./product/product.module')
        .then(m => m.ProductModule),
    },
    {
      path: 'categories',
      loadChildren: () => import('./category/category.module')
        .then(m => m.CategoryModule),
    },
    {
      path: 'bill_order',
      loadChildren: () => import('./bill-order/bill-order.module')
        .then(m => m.BillOrderModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'error/404',
      component: NotFoundComponent,
    },
    {
      path: '**',
      redirectTo: 'error/404',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
