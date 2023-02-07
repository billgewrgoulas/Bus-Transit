import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { LiveDataStore } from '../../state/live.data.store';
import { ComponentStore } from '@ngrx/component-store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataShareService } from 'src/app/services/data-share.service';
import { EMPTY } from 'rxjs';
import { autoSpy } from 'auto-spy';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      providers: [LiveDataStore],
      imports:[
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ SliderComponent ]
    }).configureTestingModule({ providers: [{ provide: DataShareService, useValue: a.msg }] })
    .compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
});

function setup() {
    const localStore = autoSpy(LiveDataStore);
    localStore.getBusLocations.and.returnValue(EMPTY);
    localStore.getStopArrivals.and.returnValue(EMPTY);
    const msg = autoSpy(DataShareService);
    
    const builder = {
        localStore,
        msg,
        default() {
            return builder;
        },
        build() {
            return new SliderComponent(localStore, msg);
        }
    }
    return builder;
}