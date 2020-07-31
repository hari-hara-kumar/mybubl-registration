import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyComponent } from './verify/verify.component';


const routes: Routes = [
  {
    path: '', loadChildren: () => import('./register-hotel/register-hotel.module').then(m => m.RegisterHotelModule)
  }, {
    path: 'verify', component: VerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
