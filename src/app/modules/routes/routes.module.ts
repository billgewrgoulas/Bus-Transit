import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { DataShareService } from 'src/app/services/data-share.service';
import { SharedModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [DataShareService]
})
export class RoutesModule { }
