import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {BillOrderService} from '../../../../@core/services/_service/bill-order.service';

@Component({
  selector: 'ngx-action-bill-order',
  templateUrl: './action-bill-order.component.html',
  styleUrls: ['./action-bill-order.component.scss'],
})
export class ActionBillOrderComponent implements OnInit {
  isSubmitted: boolean = false;
  form: FormGroup;
  @Input() action: any;
  @Input() billOrder: any;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private service: BillOrderService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.action) {
      this.form = this.fb.group({
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        createdDate: ['', Validators.required],
        description: [''],

      });
    } else {
      this.form = this.fb.group({
        id: [this.billOrder.id],
        price: [this.billOrder.price, Validators.required],
        quantity: [this.billOrder.quantity, Validators.required],
        description: [this.billOrder.description],
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
      this.service.createBillOrder(this.form.value).subscribe(res => {
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
