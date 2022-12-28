import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './components/option/option.component';
import { RouterModule } from '@angular/router';
import { BusEntityComponent } from './components/bus-entity/bus-entity.component';
import { StationEntityComponent } from './components/station-entity/station-entity.component';
import { MainInputComponent } from './components/main-input/main-input.component';
import { FormsModule } from "@angular/forms";
import { MultipleDropdownComponent } from './components/multiple-dropdown/multiple-dropdown.component';
import { DropdownOptionComponent } from './components/dropdown-option/dropdown-option.component';
import { DoubleInputComponent } from './components/double-input/double-input.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToasterComponent } from 'src/app/modules/shared-module/components/toaster/toaster.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon'
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapModule } from '../map/map.module';

@NgModule({
  declarations: [
    OptionComponent, 
    BusEntityComponent, 
    StationEntityComponent, 
    MainInputComponent,
    MultipleDropdownComponent,
    DropdownOptionComponent,
    DoubleInputComponent,
    SpinnerComponent,
    ToasterComponent,
    MiniMapComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MapModule
  ],
  exports: [
    OptionComponent, 
    BusEntityComponent, 
    StationEntityComponent, 
    MainInputComponent,
    MultipleDropdownComponent,
    DropdownOptionComponent,
    DoubleInputComponent,
    SpinnerComponent,
    ToasterComponent,
    MiniMapComponent
  ],
})
export class SharedModule { }
