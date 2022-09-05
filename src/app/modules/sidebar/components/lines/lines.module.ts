import { NgModule } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { MapService } from "src/app/services/map.service";
import { LinesRoutingModule } from "./lines-routing.module";
import { LinesComponent } from "./lines.component";
import { MultipleDropdownComponent } from "../multiple-dropdown/multiple-dropdown.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { StationListComponent } from "../station-list/station-list.component";
import { ListItemComponent } from "../list-item/list-item.component";


@NgModule({
  declarations: [
    LinesComponent,
    MultipleDropdownComponent,
    StationListComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    LinesRoutingModule,
    FormsModule
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class LinesModule { }
