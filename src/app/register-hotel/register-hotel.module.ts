import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterHotelComponent } from './register-hotel.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { DialogModule } from '../common/dialog/dialog.module';

const routes: Routes = [
  {
    path: '', component: RegisterHotelComponent
  }
]

@NgModule({
  declarations: [RegisterHotelComponent],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterHotelModule { }
