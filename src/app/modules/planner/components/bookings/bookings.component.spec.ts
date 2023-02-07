import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsComponent } from './bookings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { DirectionsStore } from '../../state/directions.store';
import { BookingsStore } from '../../state/bookings.store';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('BookingsComponent', () => {
  let component: BookingsComponent;
  let fixture: ComponentFixture<BookingsComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      providers: [DirectionsStore],
      imports:[
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ BookingsComponent ]
    }).configureTestingModule({ providers: [{ provide: BookingsStore, useValue: a.local },
            { provide: DataShareService, useValue: a.msg },
            { provide: Store<AppState>, useValue: a.store }] })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function setup() {
    const local = autoSpy(BookingsStore);
    
    const directionsStore = autoSpy(DirectionsStore);
    
    const msg = autoSpy(DataShareService);
    
    const store = autoSpy(Store<AppState>);
    store.select.and.returnValue(EMPTY);
    const router = autoSpy(Router);
    router.navigate.and.returnValue(new Promise(res => {}));
    const builder = {
        local,
        directionsStore,
        msg,
        store,
        router,
        default() {
            return builder;
        },
        build() {
            return new BookingsComponent(local, directionsStore, msg, store, router);
        }
    }
    return builder;
}