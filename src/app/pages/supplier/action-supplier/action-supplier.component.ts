import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {SupplierService} from '../../../@core/services/_service/supplier.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'ngx-action-supplier',
  templateUrl: './action-supplier.component.html',
  styleUrls: ['./action-supplier.component.scss'],
})
export class ActionSupplierComponent implements OnInit {

  @Input() action: any;
  @Input() supplier: any;
  isSubmitted: boolean = false;
  form: FormGroup;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private service: SupplierService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.action) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        logo: ['../../../assets/images/supplier/cty-a.jpg'],
        description: [''],
        address: [''],
      });
    } else {
      this.form = this.fb.group({
        id: [this.supplier.id],
        name: [this.supplier.name, Validators.required],
        description: [this.supplier.description],
        address: [this.supplier.address],
      });
    }
  }

  processSave() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.spinner.show();
      this.service.createSupplier(this.form.value).subscribe(res => {
        this.spinner.hide();
        this.toastr.info('Thêm thành công');
        this.modal.close('success');
      });
    }
  }

  close() {
    this.modal.close();
  }

  get f() {
    return this.form.controls;
  }
}
