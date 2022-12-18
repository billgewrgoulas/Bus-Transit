import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapAreaComponent } from './components/map-area/map-area.component';
import { DataShareService } from 'src/app/services/data-share.service';

@NgModule({
  declarations: [MapAreaComponent],
  imports: [CommonModule],
  exports: [MapAreaComponent],
  providers:[]
})
export class MapModule { }
