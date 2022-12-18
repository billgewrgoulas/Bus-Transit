import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookOptionsComponent } from './components/book-options/book-options.component';
import { InputComponent } from './components/input/input.component';
import { PlacesComponent } from './components/places/places.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripPlannerOptionsComponent } from './components/trip-planner-options/trip-planner-options.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';

const routes: Routes = [
  {path: '', component: InputComponent, children: [
    {path: '', component: BookOptionsComponent, canActivate: [AuthGuardService]},
    {path: 'trip/options', component: TripPlannerOptionsComponent, canActivate: [AuthGuardService]},
    {path: 'trips/:index', component: TripDetailsComponent, canActivate: [AuthGuardService]},
    {path: 'trips', component: TripListComponent, canActivate: [AuthGuardService]},
  ], canActivate: [AuthGuardService]}, 
  {path: 'places/start', component: PlacesComponent, data: { type: 'start'}, canActivate: [AuthGuardService]},
  {path: 'places/dest', component: PlacesComponent, data: { type: 'dest'}, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
