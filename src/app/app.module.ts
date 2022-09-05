import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { SidebarModule } from './modules/sidebar/sidebar.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { ApiEffects } from './state/effects/api.effects';
import { lineStateReducer } from './state/reducers/api-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MapService } from './services/map.service';
import { MapModule } from './modules/map/map.module';
import { RouterModule } from '@angular/router';
import { StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';

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
    LeafletModule,
    SidebarModule,
    MapModule,
    HttpClientModule,
    StoreModule.forRoot({api: lineStateReducer, router: routerReducer}),
    EffectsModule.forRoot([ApiEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()

  ],
  providers: [HttpClient, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
