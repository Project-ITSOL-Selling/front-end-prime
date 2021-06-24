import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {DEFAULT_MODAL_OPTIONS} from '../../@core/app-config';
import {BillOrderService} from '../../@core/services/_service/bill-order.service';
import {ActionBillOrderComponent} from './action-bill-order/action-bill-order/action-bill-order.component';
import {DeleteBillOrderComponent} from './delete-bill-order/delete-bill-order.component';

@Component({
  selector: 'ngx-bill-order',
  templateUrl: './bill-order.component.html',
  styleUrls: ['./bill-order.component.scss'],
})
export class BillOrderComponent implements OnInit {
  formSearch: FormGroup;
  listBillOrder: any[] = [];
  total: any;
  lstDel: any[] = [];
  lstDataSearch: any[] = [];


  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private service: BillOrderService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataSearch();
  }

  initForm() {
    this.formSearch = this.fb.group({
      price: [''],
    });
  }

  getDataSearch() {
    this.service.getListBillOrder().subscribe(res => {
      this.lstDataSearch = res.data;
    });
  }

  processSearch(event?: any) {
    // @ts-ignore
    this.processSearchData(event);
  }

  processEdit(item: any) {
    const modalRef = this.modal.open(ActionBillOrderComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = false;
    modalRef.componentInstance.billOrder = item;
    modalRef.result.then(value => {
        if (value === 'success') {
          this.processSearchData();
        }
      },
    );
  }

  processSearchData(event?: any) {
    this.spinner.show();
    this.service.searchBillOrder(this.formSearch.value, event).subscribe(res => {
      this.spinner.hide();
      this.listBillOrder = res.data;
      this.total = res.recordsTotal;
    });
  }

  processSave($event: any) {
    const modalRef = this.modal.open(ActionBillOrderComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {

    });
  }

  processDelete(id: any) {
    const modalRef = this.modal.open(DeleteBillOrderComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.idBillOrder = id;
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
