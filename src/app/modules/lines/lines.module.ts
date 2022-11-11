import { NgModule } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { LinesRoutingModule } from "./lines-routing.module";
import { LinesComponent } from "./lines.component";
import { MultipleDropdownComponent } from "../sidebar/components/multiple-dropdown/multiple-dropdown.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ListItemComponent } from "../sidebar/components/list-item/list-item.component";
import { SharedModule } from "src/app/modules/shared-module/shared-module.module";
import { ScheduleComponent } from "../sidebar/components/schedule/schedule.component";
import { SelectComponent } from "../sidebar/components/select/select.component";
import { SliderComponent } from "../sidebar/components/slider/slider.component";
import { StationListComponent } from "../sidebar/components/station-list/station-list.component";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";


@NgModule({
  declarations: [
    LinesComponent,
    MultipleDropdownComponent,
    ListItemComponent,
    ScheduleComponent,
    SelectComponent,
    SliderComponent,
    StationListComponent
  ],
  imports: [
    CommonModule,
    LinesRoutingModule,
    FormsModule,
    SharedModule,
    MatTabsModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class LinesModule { }
