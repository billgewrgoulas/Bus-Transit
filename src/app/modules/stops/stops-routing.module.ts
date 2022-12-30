import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopSliderComponent } from './components/stop-slider/stop-slider.component';
import { StopsComponent } from './components/stops/stops.component';
import { StopsMapComponent } from './components/stops-map/stops-map.component';
import { MiniMapService } from 'src/app/services/mini-map.service';


const routes: Routes = [
  {path: '', component: StopsComponent},
  {path: 'map', component: StopsMapComponent, canActivate: [MiniMapService]},
  {path: ':stopCode', component: StopSliderComponent,},
  {path: ':stopCode/map', component: StopsMapComponent, canActivate: [MiniMapService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopsRoutingModule { }
