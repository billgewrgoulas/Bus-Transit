import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinesDropdownComponent } from './components/lines-dropdown/lines-dropdown.component';
import { RouteDetailsComponent } from './components/route-details/route-details.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { LinesMapComponent } from './components/lines-map/lines-map.component';
import { MiniMapService } from 'src/app/services/mini-map.service';
import * as path from 'path';
import { SliderComponent } from './components/slider/slider.component';


const routes: Routes = [
  {path: '', component: LinesDropdownComponent },
  {path: ':lineCode', component: RouteListComponent, data: {animation: 'isLeft', type: 'line_module'}},
  {path: ':lineCode/route/:routeCode', component: RouteDetailsComponent, data: {animation: 'isLeft', type: 'routeSlider'}, children: [
    {path: '', component: SliderComponent},
    {path: 'map', component: LinesMapComponent, canActivate: [MiniMapService]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
