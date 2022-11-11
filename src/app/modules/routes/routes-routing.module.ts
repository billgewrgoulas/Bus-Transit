import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from 'path';
import { RouteListComponent } from '../shared-module/components/route-list/route-list.component';
import { SliderComponent } from '../sidebar/components/slider/slider.component';
import { InputComponent } from './components/input/input.component';
import { StopDropDownComponent } from './components/stop-drop-down/stop-drop-down.component';
import { StopSliderComponent } from './components/stop-slider/stop-slider.component';

const routes: Routes = [
  {path: '', component: InputComponent, children: [
    {path: '', component: StopDropDownComponent},
    {path: 'saved', component: StopSliderComponent, data: {type: 'saved'}},
  ]}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
