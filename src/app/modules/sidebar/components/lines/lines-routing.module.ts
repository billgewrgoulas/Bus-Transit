
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationListComponent } from '../station-list/station-list.component';
import { LinesComponent } from './lines.component';

const routes: Routes = [

  {path: '', component: LinesComponent, 
    children: [{
      path: ':code',
      component: StationListComponent,
    }]
  },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
