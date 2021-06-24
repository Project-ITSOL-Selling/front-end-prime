import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Customer} from '../../customer';
import {CustomerService} from '../../service/customer.service';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  form!: FormGroup;
  isSubmit = false;
  customerObj: Customer = new Customer();

  constructor(private router: Router,
              private fb: FormBuilder,
              private service: CustomerService) {
  }

  ngOnInit(): void {
    this.initForm(this.form);
  }

  initForm(form: any) {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(256)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      // ,Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\b')
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.service.createCustomer(this.form.value)
        .subscribe(
          data => {
            this.customerObj != data;
            alert('create Successfully!');
            this.backListCustomer();
          },
          error => {
            console.log(error);
          },
        );
    }
  }

  backListCustomer() {
    this.router.navigate(['customer']);
  }
}
