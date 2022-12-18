import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsRoutingModule } from './bookings-routing.module';
import { SharedModule } from '../shared-module/shared-module.module';
import { BookingsInputComponent } from './components/bookings-input/bookings-input.component';


@NgModule({
  declarations: [
    BookingsInputComponent,
  ],
  imports: [
    CommonModule, 
    BookingsRoutingModule,
    SharedModule
  ]
})
export class BookingsModule { }
