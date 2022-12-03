import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteListComponent } from './route-list/route-list.component';
import { LinesDropdownComponent } from './lines-dropdown/lines-dropdown.component';
import { RouteDetailsComponent } from './route-details/route-details.component';

const routes: Routes = [

  {path: '', component: LinesDropdownComponent, },
  {path: ':lineCode', component: RouteListComponent, data: {animation: 'isLeft', type: 'line_module'}},
  {path: ':lineCode/route/:routeCode', component: RouteDetailsComponent, data: {animation: 'isLeft', type: 'routeSlider'}}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
