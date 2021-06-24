import {Component, OnInit} from '@angular/core';
import {Supplier} from '../Supplier';
import {SupplierService} from '../service/supplier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-Edit-Supplier',
  templateUrl: './Edit-Supplier.component.html',
  styleUrls: ['./Edit-Supplier.component.css']
})
export class EditSupplierComponent implements OnInit {
  supplier: Supplier = new Supplier();
  id!: number;
  form!: FormGroup;
  isSubmit!: boolean;
  image = "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg";

  constructor(
    private service: SupplierService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.initForm(this.form);
    this.service.getSupplierById(this.id)
      .subscribe(
        data => {
          this.supplier = data;
          console.log(data);

          this.form.patchValue({
            id: this.supplier.id,
            name: this.supplier.name,
            address: this.supplier.address,
            description: this.supplier.description,
            logo: this.supplier.logo,
          })
        },
        error => {
          console.log(error);
        }
      )
  }

  initForm(form: any) {
    this.form = this.fb.group({
      id: [this.supplier.id],
      name: [this.supplier.name, Validators.required],
      address: [this.supplier.address, Validators.required],
      description: [this.supplier.description],
      logo: [this.supplier.logo],
    })
  }

  updateSupplier() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.service.updateSupplier(this.id, this.form.value)
        .subscribe(
          data => {
            this.supplier != data;
            alert('Update successfully!');
            this.gotoList();
          },
          error => {
            alert('Update Error!');
          }
        )
    }
  }

  onSubmit() {
    this.updateSupplier();
  }

  gotoList() {
    this.router.navigate(['/supplier'])
  }

  get f() {
    return this.form.controls;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      this.form.patchValue({
        logo: event.target.files[0].name
      });

    }
  }

  // onUpload(){
  //   const fd = new FormData();
  //   fd.append('image',this.selectedFile,this.selectedFile.name)
  // }
}
