import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {CityService} from '../../../@core/services/_service/city.service';
import {ProductService} from '../../../@core/services/_service/product.service';
import {StoreService} from '../../../@core/services/_service/store.service';
import {CategoriesService} from '../../../@core/services/_service/categories.service';

@Component({
  selector: 'ngx-action-product',
  templateUrl: './action-product.component.html',
  styleUrls: ['./action-product.component.scss'],
})
export class ActionProductComponent implements OnInit {


  @Input() action: any;
  @Input() product: any;
  isSubmitted: boolean = false;
  form: FormGroup;
  lstCategory: any[] = [];
  lstSupplier: any[] = [
    {
      id: '1',
      name: 'Bùi Minh Tuấn',
    }, {
      id: '2',
      name: 'Long Trần',
    }, {
      id: '3 ',
      name: 'Nguyễn Hiệp',
    },
  ];

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private service: ProductService,
    private categoryService: CategoriesService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getListCategory();
  }

  initForm() {
    if (this.action) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        image: [''],
        idCategory: ['', Validators.required],
        idSupplier: ['', Validators.required],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
      });
    } else {
      this.form = this.fb.group({
        id: [this.product.id],
        name: [this.product.name, Validators.required],
        image: [this.product.image],
        idCategory: [this.product.idCategory, Validators.required],
        idSupplier: [this.product.idSupplier, Validators.required],
        price: [this.product.price, Validators.required],
        quantity: [this.product.quantity, Validators.required],
      });
    }
  }

  getListCategory() {
    this.categoryService.getListCategory().subscribe(res => {
      this.lstCategory = res.data;
    });
  }

  close() {
    this.modal.close();
  }

  get f() {
    return this.form.controls;
  }

  // findAll() {
  //   this.storeService.findAllData().subscribe(res => {
  //     this.lstStore = res.data;
  //   });
  // }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.spinner.show();
      this.service.saveOrUpdateOverride(this.form.value).subscribe(res => {
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

