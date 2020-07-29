import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DialogService } from '../common/dialog/dialog.service';

@Component({
  selector: 'app-register-hotel',
  templateUrl: './register-hotel.component.html',
  styleUrls: ['./register-hotel.component.scss']
})
export class RegisterHotelComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private fb: FormBuilder, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.initRegisterForm();
    this.addPrivateAreas();
  }
  initRegisterForm() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phoneno: ['', Validators.required],
      businessname: ['', Validators.required],
      businesscity: ['', Validators.required],
      companyname: [''],
      doorno: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      wifi: [''],
      carparking: [''],
      projector: [''],
      tv: [''],
      beverages: [''],
      remarks: [''],
      privateares: this.fb.array([])
    })
  }
  get privateAreas() : FormArray {
    return this.registerForm.get("privateares") as FormArray;
  }
  createPrivateAreas(): FormGroup  {
    return this.fb.group({
      areaname: ['', Validators.required],
      noofrooms: ['', Validators.required],
      noofseats: ['', Validators.required]
    })
  }
  addPrivateAreas() {
    this.privateAreas.push(this.createPrivateAreas())
  }
  removePrivateAreas(i:number) {
    this.privateAreas.removeAt(i);
  }
  onSubmit() {
    this.submitted = true;
    console.log('submitted', this.registerForm)
    if (this.registerForm.valid) {
      this.dialogService.show.next({message: "Registered Successfully", title: "Success", status: true})
    }
  }
}
