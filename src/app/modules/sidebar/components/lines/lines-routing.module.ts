
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipleDropdownComponent } from '../multiple-dropdown/multiple-dropdown.component';
import { RouteListComponent } from '../route-list/route-list.component';
import { SliderComponent } from '../slider/slider.component';
import { StationListComponent } from '../station-list/station-list.component';
import { LinesComponent } from './lines.component';

const routes: Routes = [

  {path: '', component: LinesComponent, 
    children: [
      {
        path: ':lineCode',
        component: RouteListComponent,
      },
      {
        path: ':lineCode/route/:routeCode', 
        component: SliderComponent 
      }]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
