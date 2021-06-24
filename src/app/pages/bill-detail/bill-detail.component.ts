import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {DEFAULT_MODAL_OPTIONS} from '../../@core/app-config';
import {BillDetailService} from '../../@core/services/_service/bill-detail.service';
import {ActionBillDetailComponent} from './action-bill-detail/action-bill-detail.component';
import {DeleteBillDetailComponent} from './delete-bill-detail/delete-bill-detail.component';

@Component({
  selector: 'ngx-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss'],
})
export class BillDetailComponent implements OnInit {
  formSearch: FormGroup;
  listBillDetail: any[] = [];
  total: any;
  lstDel: any[] = [];
  lstDataSearch: any[] = [];


  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private service: BillDetailService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.processSearchData();
  }

  // initForm() {
  //   this.formSearch = this.fb.group({
  //     price: [''],
  //   });
  // }

  // getDataSearch() {
  //   this.service.getListBillOrder().subscribe(res => {
  //     this.lstDataSearch = res.data;
  //   });
  // }
  //
  // processSearch(event?: any) {
  //   // @ts-ignore
  //   this.processSearchData(event);
  // }

  processEdit(item: any) {
    const modalRef = this.modal.open(ActionBillDetailComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = false;
    modalRef.componentInstance.billDetail = item;
    modalRef.result.then(value => {
        if (value === 'success') {
          this.processSearchData();
        }
      },
    );
  }

  processSearchData(event?: any) {
    this.spinner.show();
    this.service.getListBillDetail().subscribe(res => {
      this.spinner.hide();
      this.listBillDetail = res.data;
      this.total = res.recordsTotal;
    });
  }

  processSave() {
    const modalRef = this.modal.open(ActionBillDetailComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {

    });
  }

  processDelete(id: any) {
    const modalRef = this.modal.open(DeleteBillDetailComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.idBillDetail = id;
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
