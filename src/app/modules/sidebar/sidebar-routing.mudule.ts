
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarOptionsComponent } from './components/sidebar-options/sidebar-options.component';

const routes: Routes = [
  {path: '', component: SidebarOptionsComponent, outlet: 'sidebar'},
  {path: 'lines', loadChildren: () => import('./components/lines/lines.module').then(m => m.LinesModule), outlet: 'sidebar'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
