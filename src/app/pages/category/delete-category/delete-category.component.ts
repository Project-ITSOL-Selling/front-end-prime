import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {ProductService} from '../../../@core/services/_service/product.service';
import {CategoriesService} from '../../../@core/services/_service/categories.service';

@Component({
  selector: 'ngx-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
})
export class DeleteCategoryComponent implements OnInit {
  @Input() idCategory: any;

  constructor(
    private modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private service: CategoriesService,
  ) {
  }

  ngOnInit(): void {
  }

  processDelete() {
    this.spinner.show();
    this.service.deleteCategoryById(this.idCategory).subscribe(res => {
      this.spinner.hide();
      if (res.code === 'success') {
        this.modal.close('success');
        this.toastr.success('success');
      } else {
        this.toastr.error('fail');
      }
    });
  }

  close() {
    this.modal.close();
  }
}
