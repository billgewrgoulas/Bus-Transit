import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAreaComponent } from './map-area.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { autoSpy } from 'auto-spy';
import { EMPTY, of, pipe } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('MapAreaComponent', () => {
  let component: MapAreaComponent;
  let fixture: ComponentFixture<MapAreaComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ MapAreaComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store },
            { provide: DataShareService, useValue: a.msg }] })
    .compileComponents();

    fixture = TestBed.createComponent(MapAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
});

function setup() {
    const store = autoSpy(Store<AppState>);
    store.select.and.returnValue(of([]));
    const msg = autoSpy(DataShareService);
    
    const router = autoSpy(Router);
    
    const builder = {
        store,
        msg,
        router,
        default() {
            return builder;
        },
        build() {
            return new MapAreaComponent(store, msg, router);
        }
    }
    return builder;
}