import {Component, OnInit} from '@angular/core';
import {ActionProductComponent} from '../product/action-product/action-product.component';
import {DEFAULT_MODAL_OPTIONS} from '../../@core/app-config';
import {ActionSupplierComponent} from './action-supplier/action-supplier.component';
import {ProductService} from '../../@core/services/_service/product.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SupplierService} from '../../@core/services/_service/supplier.service';
import {DeleteProductComponent} from "../product/delete-product/delete-product.component";
import {DeleteSupplierComponent} from "./delete-supplier/delete-supplier.component";

@Component({
  selector: 'ngx-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {

  lstDel: any[] = [];
  total: any;
  listSupplier: any[] = [];
  lstDataSearch: any[] = [];

  constructor(
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private service: SupplierService,
  ) {
  }

  ngOnInit(): void {
  }

  processSave($event: any) {
    const modalRef = this.modal.open(ActionSupplierComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {

    });
  }

  processEdit(item: any) {

  }

  processDelete(id) {
    const modalRef = this.modal.open(DeleteSupplierComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.idSupplier = id;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }

  processSearchData() {
    this.service.getListSupplier().subscribe(res => {
      this.listSupplier = res;
    });
  }
}
