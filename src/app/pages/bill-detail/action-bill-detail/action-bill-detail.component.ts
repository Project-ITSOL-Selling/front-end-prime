import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {BillOrderService} from '../../../@core/services/_service/bill-order.service';
import {BillDetailService} from '../../../@core/services/_service/bill-detail.service';
import {ProductService} from '../../../@core/services/_service/product.service';

@Component({
  selector: 'ngx-action-bill-detail',
  templateUrl: './action-bill-detail.component.html',
  styleUrls: ['./action-bill-detail.component.scss'],
})
export class ActionBillDetailComponent implements OnInit {
  isSubmitted: boolean = false;
  form: FormGroup;
  lstProduct: any[] = [];
  lstBillOrder: any[] = [];
  @Input() action: any;
  @Input() billDetail: any;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private service: BillDetailService,
    private productService: ProductService,
    private billOrderService: BillOrderService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getListProduct();
    this.getListBillOrder();
  }

  getListProduct() {
    this.productService.getListProdut().subscribe(res => {
      this.lstProduct = res.data;
    });
  }

  getListBillOrder() {
    this.billOrderService.getListBillOrder().subscribe(res => {
      this.lstBillOrder = res.data;
    });
  }

  initForm() {
    if (this.action) {
      this.form = this.fb.group({
        idProduct: ['', Validators.required],
        idBillOrder: ['', Validators.required],
        createdDate: ['', Validators.required],
        totalMoney: ['', Validators.required],

      });
    } else {
      this.form = this.fb.group({
        id: [this.billDetail.id],
        idBillOrder: [this.billDetail.idBillOrder, Validators.required],
        idProduct: [this.billDetail.idProduct, Validators.required],
        totalMoney: [this.billDetail.totalMoney, Validators.required],
      });
    }
  }

  close() {
    this.modal.close();
  }

  get f() {
    return this.form.controls;
  }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.spinner.show();
      this.service.createBillDetail(this.form.value).subscribe(res => {
        this.spinner.hide();
        if (res.code === 'success') {
          this.modal.close('success');
          this.toastr.success('success');
        } else {
          this.toastr.error('error');
        }
      });
    }
  }
}
