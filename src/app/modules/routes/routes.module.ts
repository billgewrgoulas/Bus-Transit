import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../shared-module/components/input/input.component';




@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    FormsModule
  ]
})
export class RoutesModule { }
