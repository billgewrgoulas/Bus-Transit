import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopSliderComponent } from './components/stop-slider/stop-slider.component';
import { StopsComponent } from './components/stops/stops.component';


const routes: Routes = [
  {path: '', component: StopsComponent},
  {path: ':stopCode', component: StopSliderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopsRoutingModule { }
