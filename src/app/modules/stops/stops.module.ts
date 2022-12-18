import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopsRoutingModule } from './stops-routing.module';
import { StopsComponent } from './components/stops/stops.component';
import { SharedModule } from '../shared-module/shared-module.module';
import { StopSliderComponent } from './components/stop-slider/stop-slider.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [StopsComponent, StopSliderComponent],
  imports: [
    CommonModule,
    StopsRoutingModule,
    SharedModule,
    MatTabsModule
  ]
})
export class StopsModule { }
