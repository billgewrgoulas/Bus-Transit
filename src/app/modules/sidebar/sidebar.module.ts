import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FormsModule } from '@angular/forms';
import { SidebarOptionsComponent } from './components/sidebar-options/sidebar-options.component';
import { OptionComponent } from './components/option/option.component';
import { RouterModule } from '@angular/router';
import { SidebarRoutingModule } from './sidebar-routing.mudule';

@NgModule({
  declarations: [
    SideNavComponent,
    SidebarOptionsComponent,
    OptionComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    SidebarRoutingModule
  ],
  exports: [SideNavComponent]
})
export class SidebarModule { }
