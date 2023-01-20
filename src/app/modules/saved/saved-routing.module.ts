import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedSliderComponent } from './components/saved-slider/saved-slider.component';
import { AuthGuardService } from '../../services/auth-guard.service';

const routes: Routes = [
  {path: '', component: SavedSliderComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedRoutingModule { }
