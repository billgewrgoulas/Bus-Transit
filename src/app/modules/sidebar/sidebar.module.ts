import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FormsModule } from '@angular/forms';
import { SidebarOptionsComponent } from './components/sidebar-options/sidebar-options.component';
import { RouterModule } from '@angular/router';
import { SidebarRoutingModule } from './sidebar-routing.mudule';
import { SharedModule } from '../shared-module/shared-module.module';
import { DataShareService } from 'src/app/services/data-share.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MiniMapService } from 'src/app/services/mini-map.service';

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
    SharedModule,
    BrowserAnimationsModule,
    DragDropModule,
  ],
  exports: [SideNavComponent],
  providers: [DataShareService, MiniMapService]
})
export class SidebarModule { }
