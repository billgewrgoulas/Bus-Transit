import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapAreaComponent } from './components/map-area/map-area.component';
import { MapService } from 'src/app/services/map.service';

@NgModule({
  declarations: [MapAreaComponent],
  imports: [CommonModule],
  exports: [MapAreaComponent],
  providers:[MapService]
})
export class MapModule { }
