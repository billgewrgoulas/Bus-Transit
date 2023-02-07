import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedRoutingModule } from './saved-routing.module';
import { SavedSliderComponent } from './components/saved-slider/saved-slider.component';
import { DataService } from 'src/app/services/data.service';
import { SharedModule } from '../shared-module/shared-module.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [SavedSliderComponent],
  imports: [
    CommonModule,
    SavedRoutingModule,
    SharedModule,
    MatTabsModule,
    AuthModule
  ], 
  providers: [DataService]
})
export class SavedModule { }