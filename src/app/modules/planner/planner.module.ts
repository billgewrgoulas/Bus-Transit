import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './planner-routing.module';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { SharedModule } from '../shared-module/shared-module.module';
import { StopDropDownComponent } from './components/stop-drop-down/stop-drop-down.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TripPlannerOptionsComponent } from './components/trip-planner-options/trip-planner-options.component';
import { TripComponent } from './components/trip/trip.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { DirectionsStore } from 'src/app/modules/planner/state/directions.store';
import { PlacesComponent } from './components/places/places.component';
import {MatMenuModule} from '@angular/material/menu';
import { AuthModule } from '../auth/auth.module';
import { BookOptionsComponent } from './components/book-options/book-options.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { BookingComponent } from './components/booking/booking.component';
import { QrComponent } from './components/qr/qr.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PlacesMapComponent } from './components/places-map/places-map.component';
import { PlacesSliderComponent } from './components/places-slider/places-slider.component';
import { MapModule } from '../map/map.module';
import { BookingPipe } from './pipes/bookings.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    InputComponent, 
    StopDropDownComponent, 
    TripPlannerOptionsComponent,
    TripComponent,
    TripListComponent,
    TripDetailsComponent,
    PlacesComponent,
    BookOptionsComponent,
    BookingsComponent,
    BookingComponent, 
    QrComponent,
    PlacesMapComponent,
    PlacesSliderComponent,
    BookingPipe
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    FormsModule,
    SharedModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatButtonModule,
    MatMenuModule,
    AuthModule,
    QRCodeModule,
    MapModule
  ],providers: [DirectionsStore, AuthService]
})
export class PlannerModule { }
