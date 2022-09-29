import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FormsModule } from '@angular/forms';
import { SidebarOptionsComponent } from './components/sidebar-options/sidebar-options.component';
import { RouterModule } from '@angular/router';
import { SidebarRoutingModule } from './sidebar-routing.mudule';
import { SharedModule } from '../shared-module/shared-module.module';
import { DataShareService } from 'src/app/services/data-share.service';

@NgModule({
  declarations: [
    SideNavComponent,
    SidebarOptionsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    SidebarRoutingModule,
    SharedModule
  ],
  exports: [SideNavComponent],
  providers: [DataShareService]
})
export class SidebarModule { }
