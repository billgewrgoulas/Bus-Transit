import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { StationListComponent } from './components/station-list/station-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SideNavComponent,
    DropdownComponent,
    StationListComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [SideNavComponent]
})
export class SidebarModule { }
