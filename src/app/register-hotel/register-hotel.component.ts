import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DialogService } from '../common/dialog/dialog.service';
import { PostDataService } from '../common/services/postdata.service';

@Component({
  selector: 'app-register-hotel',
  templateUrl: './register-hotel.component.html',
  styleUrls: ['./register-hotel.component.scss']
})
export class RegisterHotelComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  isChecked = [];
  optionList = [];
  optionsSelected = [];
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(private fb: FormBuilder,
    private dialogService: DialogService,
    private apiService: PostDataService,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.getInitialData();
    this.initRegisterForm();
    this.addPrivateAreas();
  }
  initRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phoneNumber: ['', Validators.required],
      businessName: ['', Validators.required],
      businessCity: ['', Validators.required],
      companyName: [''],
      doorNo: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      pinCode: ['', Validators.required],
      minOffPeak: ['', Validators.required],
      minHrPeak: ['', Validators.required],
      minHrXmas: ['', Validators.required],
      remarks: [''],
      privateArea: this.fb.array([])
    });
  }
  get privateAreas(): FormArray {
    return this.registerForm.get('privateArea') as FormArray;
  }
  createPrivateAreas(): FormGroup {
    return this.fb.group({
      areaName: ['', Validators.required],
      noOfRoom: ['', Validators.required],
      noOfSeats: ['', Validators.required]
    });
  }
  getInitialData() {
    const params = {
      limit: 10,
      offset: 0
    };
    this.apiService.get('option/list', params).subscribe((res: any) => {
      this.optionList = res.data.optionList;
    });
  }
  addPrivateAreas() {
    this.privateAreas.push(this.createPrivateAreas());
  }
  removePrivateAreas(i: number) {
    this.privateAreas.removeAt(i);
  }
  onSelectOption(event, item, i): void {
    if (event.target.checked) {
      this.optionsSelected.push(item.optionId);
      this.isChecked[i] = true;
    } else {
      this.isChecked[i] = false;
      this.optionsSelected = this.optionsSelected.filter(el => el.optionId !== item.optionId);
    }
  }
  onSubmit() {
    this.submitted = true;
    console.log('submitted', this.registerForm);
    if (!this.registerForm.valid) {
      this.setfocus();
      return;
    }
    const data = this.registerForm.value;
    data.options = this.optionsSelected.join(',');
    this.apiService.post('user/register', data).subscribe((res: any) => {
      if (res.status == 1) {
        this.dialogService.show.next({ message: 'Registered Successfully', title: 'Success', status: true });
        this.registerForm.reset();
        this.registerForm.clearValidators();
        this.submitted = false;
        this.isChecked = [];
        window.scrollTo(0, 0);
      } else {
        this.dialogService.show.next({ message: 'Contact Your Administaror', title: 'Error', status: true });
      }
    });
  }
  setfocus() {
    for (const key of Object.keys(this.registerForm.controls)) {
      if (this.registerForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
}
