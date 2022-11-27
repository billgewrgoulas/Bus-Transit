import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripDetailsComponent } from 'src/app/modules/routes/components/trip-details/trip-details.component';
import { DropDownWrapperComponent } from '../shared-module/components/drop-down-wrapper/drop-down-wrapper.component';
import { InputComponent } from './components/input/input.component';
import { StopDropDownComponent } from './components/stop-drop-down/stop-drop-down.component';
import { StopSliderComponent } from './components/stop-slider/stop-slider.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripPlannerOptionsComponent } from './components/trip-planner-options/trip-planner-options.component';

const routes: Routes = [
  {path: '', component: InputComponent, children: [
    {path: '', component: StopDropDownComponent},
    {path: 'places', component: StopSliderComponent},
    {path: 'trip/options', component: TripPlannerOptionsComponent},
    {path: 'trips/:index', component: TripDetailsComponent},
    {path: 'trips', component: TripListComponent},
    {path: 'search', component: DropDownWrapperComponent, data: {type: 'route_module'}},
  ]}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
