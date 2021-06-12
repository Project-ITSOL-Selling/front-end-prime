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
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
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
    // {
    //   path: 'store',
    //   loadChildren: () => import('./store/store.module')
    //     .then(m => m.StoreModule),
    // },

    // {
    //   path: 'category',
    //   loadChildren: () => import('./category/category.module')
    //     .then(m => m.CategoryModule),
    // },
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
