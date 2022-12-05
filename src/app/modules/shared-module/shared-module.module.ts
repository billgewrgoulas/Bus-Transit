import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './components/option/option.component';
import { RouterModule } from '@angular/router';
import { BusEntityComponent } from './components/bus-entity/bus-entity.component';
import { StationEntityComponent } from './components/station-entity/station-entity.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { DropDownWrapperComponent } from './components/drop-down-wrapper/drop-down-wrapper.component';
import { MainInputComponent } from './components/main-input/main-input.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    OptionComponent, 
    BusEntityComponent, 
    StationEntityComponent, 
    RouteListComponent,
    DropDownWrapperComponent,
    MainInputComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule
  ],
  exports: [
    OptionComponent, 
    BusEntityComponent, 
    StationEntityComponent, 
    RouteListComponent,
    DropDownWrapperComponent,
    MainInputComponent
  ],
})
export class SharedModule { }
