import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropDownWrapperComponent } from '../shared-module/components/drop-down-wrapper/drop-down-wrapper.component';
import { SliderComponent } from '../sidebar/components/slider/slider.component';
import { InputComponent } from './components/input/input.component';
import { StopDropDownComponent } from './components/stop-drop-down/stop-drop-down.component';
import { StopSliderComponent } from './components/stop-slider/stop-slider.component';

const routes: Routes = [
  {path: '', component: InputComponent, children: [
    {path: '', component: StopDropDownComponent},
    {path: 'places', component: StopSliderComponent},
    {path: 'search', component: DropDownWrapperComponent, data: {type: 'route_module'}},
  ]}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
