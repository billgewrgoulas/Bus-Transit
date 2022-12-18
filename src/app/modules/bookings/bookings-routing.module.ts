import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsInputComponent } from './components/bookings-input/bookings-input.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';



const routes: Routes = [
  {path: '', component: BookingsInputComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
