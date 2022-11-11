import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './components/option/option.component';
import { RouterModule } from '@angular/router';
import { BusEntityComponent } from './components/bus-entity/bus-entity.component';
import { StationEntityComponent } from './components/station-entity/station-entity.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { SliderComponent } from '../sidebar/components/slider/slider.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { StationListComponent } from '../sidebar/components/station-list/station-list.component';

@NgModule({
  declarations: [
    OptionComponent, 
    BusEntityComponent, 
    StationEntityComponent, 
    RouteListComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule, 
  ],
  exports: [
    OptionComponent, 
    BusEntityComponent, 
    StationEntityComponent, 
    RouteListComponent,
  ],
})
export class SharedModule { }
