import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { DataShareService } from 'src/app/services/data-share.service';
import { SharedModule } from '../shared-module/shared-module.module';
import { StopDropDownComponent } from './components/stop-drop-down/stop-drop-down.component';
import { StopSliderComponent } from './components/stop-slider/stop-slider.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [InputComponent, StopDropDownComponent, StopSliderComponent],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    FormsModule,
    SharedModule,
    MatTabsModule,
    MatSelectModule
  ],
  providers: []
})
export class RoutesModule { }
