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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TripPlannerOptionsComponent } from './components/trip-planner-options/trip-planner-options.component';
import { TripComponent } from './components/trip/trip.component';
import { TripListComponent } from './components/trip-list/trip-list.component';

@NgModule({
  declarations: [
    InputComponent, 
    StopDropDownComponent, 
    StopSliderComponent, 
    TripPlannerOptionsComponent,
    TripComponent,
    TripListComponent
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    FormsModule,
    SharedModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class RoutesModule { }
