import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../Supplier';
import { SupplierService } from '../../service/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  supplier:Supplier = new Supplier();
  form!:FormGroup;
  isSubmit!: boolean;
  constructor(private service:SupplierService,
    private router: Router,
    private fb:FormBuilder) { }

  ngOnInit() {
    this.initForm(this.form);
    
  }
  initForm(form:any){
    this.form = this.fb.group({
      id:[0],
      name:['',Validators.required],
      address:['',Validators.required],
      description:['',Validators.required],
      logo:['',Validators.required],
    })
  }
  
  gotoList(){
    this.router.navigate(['/supplier'])
  }
  get f() {
    return this.form.controls;
  }
  save() {
    this.isSubmit=true;
    if(this.form.valid){
      this.service
      .createSupplier(this.form.value)
      .subscribe(data => {
        console.log(data)
        this.supplier != data;
        alert('Create Successfully!');
        this.gotoList();
      }, 
      error => console.log(error));
    }  
  }
  onSubmit() {
    this.save();    
  }
  onFileSelected(event: any){
    // console.log(event.target.files);
    // this.form.patchValue({
    //   logo:event.target.files[0].name    
    // });
    
    
    if(event.target.files){
      this.form.patchValue({
        logo:event.target.files[0].name      
      });   
      
    }
  }
}
