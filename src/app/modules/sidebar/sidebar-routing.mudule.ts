
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarOptionsComponent } from './components/sidebar-options/sidebar-options.component';

const routes: Routes = [
  {path: '', component: SidebarOptionsComponent, outlet: 'sidebar'},
  {path: 'lines', loadChildren: () => import('../lines/lines.module').then(m => m.LinesModule), outlet: 'sidebar'},
  {path: 'routes', loadChildren: () => import('../routes/routes.module').then(m => m.RoutesModule), outlet: 'sidebar'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
