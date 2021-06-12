import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './category.component';
import {PortletModule} from '../../shares/portlet/portlet.module';
import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {TranslateModule} from '@ngx-translate/core';
import {DeleteCategoryComponent} from './delete-category/delete-category.component';
import {ActionCategoryComponent} from './action-category/action-category.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';


const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
];

@NgModule({
  declarations: [CategoryComponent, DeleteCategoryComponent, ActionCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PortletModule,
    TooltipModule,
    TableModule,
    TranslateModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
  ],
})

export class CategoryModule {
}
