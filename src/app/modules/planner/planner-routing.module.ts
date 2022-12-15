import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookOptionsComponent } from './components/book-options/book-options.component';
import { InputComponent } from './components/input/input.component';
import { PlacesComponent } from './components/places/places.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripPlannerOptionsComponent } from './components/trip-planner-options/trip-planner-options.component';

const routes: Routes = [
  {path: '', component: InputComponent, children: [
    {path: '', component: BookOptionsComponent},
    {path: 'trip/options', component: TripPlannerOptionsComponent},
    {path: 'trips/:index', component: TripDetailsComponent},
    {path: 'trips', component: TripListComponent},
  ]}, 
  {path: 'places/start', component: PlacesComponent, data: { type: 'start'}},
  {path: 'places/dest', component: PlacesComponent, data: { type: 'dest'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
