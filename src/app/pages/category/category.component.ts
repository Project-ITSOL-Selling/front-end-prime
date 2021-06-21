import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../@core/services/_service/product.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActionProductComponent} from '../product/action-product/action-product.component';
import {DEFAULT_MODAL_OPTIONS} from '../../@core/app-config';
import {DeleteProductComponent} from '../product/delete-product/delete-product.component';
import {CategoriesService} from '../../@core/services/_service/categories.service';
import {ActionCategoryComponent} from './action-category/action-category.component';
import {DeleteCategoryComponent} from './delete-category/delete-category.component';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  formSearch: FormGroup;
  listCategory: any[] = [];
  total: any;
  lstDel: any[] = [];
  lstDataSearch: any[] = [];


  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private service: CategoriesService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataSearch();
  }

  initForm() {
    this.formSearch = this.fb.group({
      name: [''],
    });
  }

  getDataSearch() {
    this.service.getListCategory().subscribe(res => {
      this.lstDataSearch = res.data;
    });
  }

  processSearch(event?: any) {
    // @ts-ignore
    this.processSearchData(event);
  }

  processEdit(item: any) {
    const modalRef = this.modal.open(ActionCategoryComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = false;
    modalRef.componentInstance.category = item;
    modalRef.result.then(value => {
        if (value === 'success') {
          this.processSearchData();
        }
      },
    );
  }

  processSearchData(event?: any) {
    this.spinner.show();
    this.service.searchCategory(this.formSearch.value, event).subscribe(res => {
      this.spinner.hide();
      this.listCategory = res.data;
      this.total = res.recordsTotal;
    });
  }

  processSave($event: any) {
    const modalRef = this.modal.open(ActionCategoryComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {

    });
  }

  processDelete(id: any) {
    const modalRef = this.modal.open(DeleteCategoryComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.idCategory = id;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }

  close() {
    // @ts-ignore
    this.modal.close();
  }
}
