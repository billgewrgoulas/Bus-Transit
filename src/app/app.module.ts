import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MapAreaComponent } from './modules/map/components/map-area/map-area.component';
import { SidebarModule } from './modules/sidebar/sidebar.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { ApiEffects } from './state/effects/api.effects';
import { lineStateReducer } from './state/reducers/api-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MapService } from './services/map.service';
import { MapModule } from './modules/map/map.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    LeafletModule,
    SidebarModule,
    MapModule,
    StoreModule.forRoot({
      api: lineStateReducer,
    }),
    HttpClientModule,
    EffectsModule.forRoot([ApiEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [HttpClient, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
