import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BillDetailComponent} from './bill-detail.component';


const routes: Routes = [
  {
    path: '',
    component: BillDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class BillDetailModule {
}
