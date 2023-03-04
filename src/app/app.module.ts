import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthEffects } from "./modules/auth/state/auth.effects";
import { authReducer } from "./modules/auth/state/message.reducer";
import { MapModule } from "./modules/map/map.module";
import { SidebarModule } from "./modules/sidebar/sidebar.module";
import { SocketIOService } from "./services/socket-io.service";
import { ApiEffects } from "./state/Effects/api.effects";
import { RouterEffects } from "./state/Effects/router.effects";
import { CustomSerializer } from "./state/Selectors/custom-route-serializer";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { Reducer } from "./state/Reducers/api-reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    LeafletModule,
    SidebarModule,
    MapModule,
    HttpClientModule,
    StoreModule.forRoot({api: Reducer.getReducer, router: routerReducer, auth: authReducer}),
    EffectsModule.forRoot([ApiEffects, RouterEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer, stateKey: 'router'})
  ],
  providers: [HttpClient, SocketIOService],
  bootstrap: [AppComponent]
})
export class AppModule { }
