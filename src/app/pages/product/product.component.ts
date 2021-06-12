import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CityService} from '../../@core/services/_service/city.service';
import {DEFAULT_MODAL_OPTIONS} from '../../@core/app-config';
import {ActionProductComponent} from './action-product/action-product.component';
import {ProductService} from '../../@core/services/_service/product.service';
import {DeleteProductComponent} from './delete-product/delete-product.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  lstDel: any[] = [];
  total: any;
  listProduct: any[] = [];
  formSearch: FormGroup;
  lstDataSearch: any[] = [];


  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private service: ProductService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.processSearchData();
    // this.getNameDepartment();
    // this.initForm();
  }

  get f() {
    return this.formSearch.controls;
  }

  // initForm() {
  //   this.formSearch = this.fb.group({
  //     productName: [''],
  //     nameStore: [''],
  //   });
  // }

  // getNameDepartment() {
  //   this.service.findAllData().subscribe(res => {
  //     this.lstDataSearch = res.data;
  //   });
  // }

  processEdit(item: any) {
    const modalRef = this.modal.open(ActionProductComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = false;
    modalRef.componentInstance.product = item;
    modalRef.result.then(value => {
        if (value === 'success') {
          this.processSearchData();
        }
      },
    );
  }

  // processSearch(event?: any) {
  //   // @ts-ignore
  //   this.processSearchData(event);
  // }

  processSearchData() {
    this.service.getListProdut().subscribe(res => {
      this.listProduct = res.data;
    });
  }

  processSave($event: any) {
    const modalRef = this.modal.open(ActionProductComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {

    });
  }

  processDelete(id: any) {
    const modalRef = this.modal.open(DeleteProductComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.idProduct = id;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }
}
