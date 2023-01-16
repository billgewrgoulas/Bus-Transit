import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookOptionsComponent } from './components/book-options/book-options.component';
import { InputComponent } from './components/input/input.component';
import { PlacesComponent } from './components/places/places.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripPlannerOptionsComponent } from './components/trip-planner-options/trip-planner-options.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { BookingsComponent } from './components/bookings/bookings.component';
import { QrComponent } from './components/qr/qr.component';
import { PlacesSliderComponent } from './components/places-slider/places-slider.component';
import { PlacesMapComponent } from './components/places-map/places-map.component';
import { MiniMapComponent } from '../shared-module/components/mini-map/mini-map.component';
import { MiniMapService } from 'src/app/services/mini-map.service';

const routes: Routes = [
  {path: '', component: InputComponent, children: [
    {path: '', component: BookOptionsComponent, canActivate: [AuthGuardService]},
    {path: 'trips/map', component: MiniMapComponent, canActivate: [AuthGuardService]},
    {path: 'trip/options', component: TripPlannerOptionsComponent, canActivate: [AuthGuardService]},
    {path: 'trips/:index', component: TripDetailsComponent, canActivate: [AuthGuardService]},
    {path: 'trips', component: TripListComponent, canActivate: [AuthGuardService]},
  ], canActivate: [AuthGuardService]}, 
  {path: 'places/start', component: PlacesComponent, data: { type: 'start'}, canActivate: [AuthGuardService], children: [
      {path: '', component: PlacesSliderComponent}, 
      {path: 'map', component: PlacesMapComponent, canActivate: [MiniMapService]}
    ]
  },
  {path: 'places/dest', component: PlacesComponent, data: { type: 'dest'}, canActivate: [AuthGuardService],
    children: [
      {path: '', component: PlacesSliderComponent}, 
      {path: 'map', component: PlacesMapComponent, canActivate: [MiniMapService]}
    ],
  },
  {path: 'booking/qr/:id', component: QrComponent, canActivate: [AuthGuardService]},
  {path: 'bookings', component: BookingsComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
