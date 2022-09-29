import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './components/option/option.component';
import { RouterModule } from '@angular/router';
import { EntityComponent } from './components/entity/entity.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { BusEntityComponent } from './components/bus-entity/bus-entity.component';
import { StationEntityComponent } from './components/station-entity/station-entity.component';

@NgModule({
  declarations: [
    OptionComponent, 
    BusEntityComponent, 
    StationEntityComponent, 
    EntityListComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    OptionComponent, 
    BusEntityComponent, 
    StationEntityComponent, 
    EntityListComponent
  ]
})
export class SharedModule { }
