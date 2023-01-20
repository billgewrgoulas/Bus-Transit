
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';
import { SidebarOptionsComponent } from './components/sidebar-options/sidebar-options.component';

const routes: Routes = [
  {path: '', component: SidebarOptionsComponent, outlet: 'sidebar'},
  {path: 'stops', loadChildren: () => import('../stops/stops.module').then(m => m.StopsModule), outlet: 'sidebar', data: {animation: 'isRight'}},
  {path: 'lines', loadChildren: () => import('../lines/lines.module').then(m => m.LinesModule), outlet: 'sidebar', data: {animation: 'isRight'}},
  {path: 'routes', loadChildren: () => import('../planner/planner.module').then(m => m.PlannerModule), outlet: 'sidebar', data: {animation: 'isRight'}},
  {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule), outlet: 'sidebar', data: {animation: 'isRight'}},
  {path: 'saved', loadChildren: () => import('../saved/saved.module').then(m => m.SavedModule), outlet: 'sidebar', data: {animation: 'isRight'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
