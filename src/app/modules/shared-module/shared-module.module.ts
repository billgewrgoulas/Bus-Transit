import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './components/option/option.component';
import { RouterModule } from '@angular/router';
import { EntityComponent } from './components/entity/entity.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';

@NgModule({
  declarations: [OptionComponent, EntityComponent, EntityListComponent],
  imports: [CommonModule, RouterModule],
  exports: [OptionComponent, EntityComponent, EntityListComponent]
})
export class SharedModule { }
