import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './components/option/option.component';
import { RouterModule } from '@angular/router';
import { BusEntityComponent } from './components/bus-entity/bus-entity.component';
import { StationEntityComponent } from './components/station-entity/station-entity.component';

@NgModule({
  declarations: [
    OptionComponent, 
    BusEntityComponent, 
    StationEntityComponent, 
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    OptionComponent, 
    BusEntityComponent, 
    StationEntityComponent, 
  ]
})
export class SharedModule { }
