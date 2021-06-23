import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../../customer';
import { CustomerService } from '../../service/customer.service';
import { data } from 'jquery';
import { error } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {
  form!: FormGroup;
  isSubmit = false;
  customerObj : Customer = new Customer();
  id!:number;
  constructor(private router: Router,
    private fb: FormBuilder,
    private service:CustomerService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
    ) {
      
     }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.getCustomerById(this.id);
    this.initForm(this.form);
  }
  initForm(form: any) {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      address: ['', [Validators.required,Validators.maxLength(256)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required]
      // ,Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\b')
    });
  }

  get f() {
    return this.form.controls;
  }
  getCustomerById(id:number){
    this.service.getSingleCustomer(id)
    .subscribe(
      data=>{
        this.customerObj=data;
        this.form.patchValue({
          id:this.customerObj.id,
          name: this.customerObj.name,
          address:this.customerObj.address,
          dob:this.datePipe.transform(this.customerObj.dob, 'yyyy-MM-dd'),
          email:this.customerObj.email,
          gender:this.customerObj.gender,
          phoneNumber:this.customerObj.phoneNumber
        })
        
      },
      error=>{
        console.log(error);
      }
    )
  }
  onSubmit(id:number){
    this.isSubmit=true;
    if(this.form.valid){
      this.service.updateCustomer(this.id,this.form.value)
      .subscribe(
        data=>{
          this.customerObj!=data;
          alert('update Successfully!');
          this.backListCustomer();
        },
        error=>{
          console.log(error);
        }
      )
    }
  }
  backListCustomer(){
    this.router.navigate(['customer']);
  }
}
