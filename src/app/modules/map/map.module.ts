import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapAreaComponent } from './components/map-area/map-area.component';

@NgModule({
  declarations: [MapAreaComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MapAreaComponent
  ]
})
export class MapModule { }
