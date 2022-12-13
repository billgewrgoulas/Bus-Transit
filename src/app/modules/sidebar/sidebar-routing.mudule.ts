
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { SidebarOptionsComponent } from './components/sidebar-options/sidebar-options.component';

const routes: Routes = [
  {path: '', component: SidebarOptionsComponent, outlet: 'sidebar'},
  {path: 'lines', loadChildren: () => import('../lines/lines.module').then(m => m.LinesModule), outlet: 'sidebar', data: {animation: 'isRight'}},
  {path: 'routes', loadChildren: () => import('../routes/routes.module').then(m => m.RoutesModule), outlet: 'sidebar', data: {animation: 'isRight'}, canActivate: [AuthGuardService]},
  {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule), outlet: 'sidebar', data: {animation: 'isRight'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
