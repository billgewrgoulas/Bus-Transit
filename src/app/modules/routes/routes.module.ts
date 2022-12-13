import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { SharedModule } from '../shared-module/shared-module.module';
import { StopDropDownComponent } from './components/stop-drop-down/stop-drop-down.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TripPlannerOptionsComponent } from './components/trip-planner-options/trip-planner-options.component';
import { TripComponent } from './components/trip/trip.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { DirectionsStore } from 'src/app/state/LocalStore/directions.store';
import { PlacesComponent } from './components/places/places.component';
import { BookOptionsComponent } from 'src/app/modules/routes/components/book-options/book-options.component';
import {MatMenuModule} from '@angular/material/menu';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    InputComponent, 
    StopDropDownComponent, 
    TripPlannerOptionsComponent,
    TripComponent,
    TripListComponent,
    TripDetailsComponent,
    PlacesComponent,
    BookOptionsComponent
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
    MatExpansionModule,
    MatButtonModule,
    MatMenuModule,
    AuthModule
  ],providers: [DirectionsStore]
})
export class RoutesModule { }
