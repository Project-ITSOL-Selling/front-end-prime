import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {ProductService} from '../../../@core/services/_service/product.service';
import {StoreService} from '../../../@core/services/_service/store.service';
import {CategoriesService} from '../../../@core/services/_service/categories.service';

@Component({
  selector: 'ngx-action-category',
  templateUrl: './action-category.component.html',
  styleUrls: ['./action-category.component.scss'],
})
export class ActionCategoryComponent implements OnInit {
  isSubmitted: boolean = false;
  form: FormGroup;
  @Input() action: any;
  @Input() category: any;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private service: CategoriesService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.action) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        image: ['../../../assets/images/supplier/cty-a.jpg'],
        description: [''],

      });
    } else {
      this.form = this.fb.group({
        id: [this.category.id],
        name: [this.category.name, Validators.required],
        image: [this.category.image],
        description: [this.category.description],
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
      this.service.createCategory(this.form.value).subscribe(res => {
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
