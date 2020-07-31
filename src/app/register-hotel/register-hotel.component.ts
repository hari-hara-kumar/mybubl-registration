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
  totalUsers = 0;
  constructor(private fb: FormBuilder,
    private dialogService: DialogService,
    private apiService: PostDataService,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.getInitialData();
    this.initRegisterForm();
    this.addPrivateAreas();
    this.getTotalUsers();
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
  getTotalUsers() {
    const params = {
      limit: 0,
      offset: 0
    };
    this.apiService.get('user/user-list', params).subscribe((res: any) => {
      this.totalUsers = res?.data?.userListCount;
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
    if (!this.registerForm.valid) {
      this.setfocus();
      return;
    }
    const data = this.registerForm.value;
    data.options = this.optionsSelected.join(',');
    this.apiService.post('user/register', data).subscribe((res: any) => {
      if (res.status == 1) {
        this.dialogService.show.next({ message: 'Submitted Successfully', title: 'Success', status: true });
        this.registerForm.reset();
        this.registerForm.clearValidators();
        this.submitted = false;
        this.isChecked = [];
        window.scrollTo(0, 0);
        this.getTotalUsers();
      } else {
        this.dialogService.show.next({ message: res.message ? res.message : 'Contact Your Administaror', title: 'Error', status: true });
      }
    });
  }
  setfocus() {
    for (const key of Object.keys(this.registerForm.controls)) {
      if (this.registerForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        if (invalidControl) {
          invalidControl.focus();
        }
        break;
      }
    }
  }

  findingSuffix(i) {
    const j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + 'st';
    }
    if (j == 2 && k != 12) {
      return i + 'nd';
    }
    if (j == 3 && k != 13) {
      return i + 'rd';
    }
    return i + 'th';
  }
}
