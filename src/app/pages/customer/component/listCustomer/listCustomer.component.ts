import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../service/customer.service';
import {Customer} from '../../customer';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listCustomer',
  templateUrl: './listCustomer.component.html',
  styleUrls: ['./listCustomer.component.css'],
})
export class ListCustomerComponent implements OnInit {
  // submitted=false;
  customers!: Customer[];
  // customer!:Customer;
  // form!: FormGroup;
  // showCustomer=false;
  constructor(private service: CustomerService,
              private router: Router,
  ) {

  }

  ngOnInit() {
    this.getListCustomer();

  }

  // initForm(form: any) {
  //   this.form = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     address: ['', Validators.required],
  //     dob: ['', Validators.required,Validators],
  //     email: ['', Validators.required,Validators.email],
  //     gender: ['', Validators.required],
  //     phone_number: ['', Validators.required]
  //   });
  // }
  // get f() { return this.form.controls; }
  getListCustomer() {
    this.service.getListCustomer()
      .subscribe(
        data => {
          this.customers = data;
        },
        error => {
          console.log(error);
        },
      );
  }

  addNewcustomer() {
    this.router.navigate(['/pages/customer/create-customer']);
  }

  openUpdateCustomer(id: number) {
    this.router.navigate(['/pages/customer/update-customer', id]);
  }

  deleteuser(id: number) {
    if (confirm('Are you want to delete ' + id)) {
      this.service.deleteCustomer(id)
        .subscribe(
          data => {
            alert('Delete Success!');
            this.ngOnInit();
          },
          error => {
            alert('Delete Error!');
          },
        );
    }

  }

  // onSubmit(){
  //   this.submitted=true;

  //   if(this.form.invalid){
  //     return;
  //   }if(this.submitted){
  //     this.service.createCustomer(this.form)
  //     this.service.getListCustomer()
  //     .subscribe(
  //       data => {
  //         this.customers != data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  //   }
  // }
}
