import { NgModule } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { LinesRoutingModule } from "./lines-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/modules/shared-module/shared-module.module";
import { SelectComponent } from "./components/select/select.component";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { LinesDropdownComponent } from "./components/lines-dropdown/lines-dropdown.component";
import { ListItemComponent } from "./components/list-item/list-item.component";
import { MultipleDropdownComponent } from "./components/multiple-dropdown/multiple-dropdown.component";
import { RouteDetailsComponent } from "./components/route-details/route-details.component";
import { RouteListComponent } from "./components/route-list/route-list.component";
import { SliderComponent } from "./components/slider/slider.component";
import { StationListComponent } from "./components/station-list/station-list.component";


@NgModule({
  declarations: [
    MultipleDropdownComponent,
    ListItemComponent,
    SelectComponent,
    SliderComponent,
    StationListComponent,
    LinesDropdownComponent,
    RouteListComponent,
    RouteDetailsComponent
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
