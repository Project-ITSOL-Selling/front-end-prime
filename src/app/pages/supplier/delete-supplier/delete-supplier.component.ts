import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {SupplierService} from '../../../@core/services/_service/supplier.service';

@Component({
  selector: 'ngx-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.scss'],
})
export class DeleteSupplierComponent implements OnInit {
  @Input() idSupplier: any;

  constructor(
    private modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: SupplierService,
  ) {
  }

  ngOnInit(): void {
  }

  processDelete() {
    this.spinner.show();
    this.service.deleteSupplier(this.idSupplier).subscribe(res => {
      this.spinner.hide();
      this.modal.close('success');
      this.toastr.success('success');
    });
  }

  close() {
    this.modal.close();
  }

}
