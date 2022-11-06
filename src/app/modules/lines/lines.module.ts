import { NgModule } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { MapService } from "src/app/services/map.service";
import { LinesRoutingModule } from "./lines-routing.module";
import { LinesComponent } from "./lines.component";
import { MultipleDropdownComponent } from "../sidebar/components/multiple-dropdown/multiple-dropdown.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { StationListComponent } from "../sidebar/components/station-list/station-list.component";
import { ListItemComponent } from "../sidebar/components/list-item/list-item.component";
import { RouteListComponent } from "../sidebar/components/route-list/route-list.component";
import { SharedModule } from "src/app/modules/shared-module/shared-module.module";
import { SliderComponent } from "../sidebar/components/slider/slider.component";
import { MatTabsModule } from '@angular/material/tabs';
import { ScheduleComponent } from "../sidebar/components/schedule/schedule.component";
import { MatSelectModule } from '@angular/material/select';
import { SelectComponent } from "../sidebar/components/select/select.component";


@NgModule({
  declarations: [
    LinesComponent,
    MultipleDropdownComponent,
    StationListComponent,
    ListItemComponent,
    RouteListComponent,
    SliderComponent,
    ScheduleComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    LinesRoutingModule,
    FormsModule,
    SharedModule,
    MatTabsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class LinesModule { }
