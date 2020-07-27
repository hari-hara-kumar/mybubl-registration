import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterHotelComponent } from './register-hotel.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: RegisterHotelComponent
  }
]

@NgModule({
  declarations: [RegisterHotelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterHotelModule { }
