
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipleDropdownComponent } from '../sidebar/components/multiple-dropdown/multiple-dropdown.component';
import { RouteListComponent } from '../shared-module/components/route-list/route-list.component';
import { SliderComponent } from '../sidebar/components/slider/slider.component';
import { StationListComponent } from '../sidebar/components/station-list/station-list.component';
import { LinesComponent } from './lines.component';

const routes: Routes = [

  {path: '', component: LinesComponent, 
    children: [
      {
        path: ':lineCode',
        component: RouteListComponent,
        data: {type: 'lineSlider'}
      },
      {
        path: ':lineCode/route/:routeCode', 
        component: SliderComponent,
        data: {type: 'routeSlider'}
      }]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
