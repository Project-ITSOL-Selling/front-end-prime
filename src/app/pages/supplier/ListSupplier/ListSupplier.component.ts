import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../service/supplier.service';
import { Supplier } from '../Supplier';
import { error } from '@angular/compiler/src/util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditSupplierComponent } from '../Edit-Supplier/Edit-Supplier.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ListSupplier',
  templateUrl: './ListSupplier.component.html',
  styleUrls: ['./ListSupplier.component.css']
})
export class ListSupplierComponent implements OnInit {
  supplier!:Supplier[];
  name='';

  constructor(
    private service : SupplierService,
    // private modalService: NgbModal
    private modal: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData(){
    this.service.getSupplierList()
      .subscribe(
        data => {
          this.supplier = data;
          console.log(data);

        },
        error => {
          console.log(error);
        });
  }
  addNewSupplier(){
    this.router.navigate(['create-supplier']);
  }
  // searchSupLikeName(){
  //   this.service.getSupplierLikeName(this.name)
  //   .subscribe(
  //     data=>{
  //       this.supplier!=data;
  //       console.log(data);
  //     },
  //     error=>{
  //       console.log(error);
  //     }
  //   )
  // }
  // onEdit(id:number){
  //   this.modal.open(EditSupplierComponent);
  //   console.log(id);
  // }

}
