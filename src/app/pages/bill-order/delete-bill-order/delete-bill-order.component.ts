import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {BillOrderService} from '../../../@core/services/_service/bill-order.service';

@Component({
  selector: 'ngx-delete-bill-order',
  templateUrl: './delete-bill-order.component.html',
  styleUrls: ['./delete-bill-order.component.scss'],
})
export class DeleteBillOrderComponent implements OnInit {

  @Input() idBillOrder: any;

  constructor(
    private modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private service: BillOrderService,
  ) {
  }

  ngOnInit(): void {
  }

  processDelete() {
    this.spinner.show();
    this.service.deleteBillOrderById(this.idBillOrder).subscribe(res => {
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
