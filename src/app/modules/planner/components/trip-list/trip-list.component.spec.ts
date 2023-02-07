import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListComponent } from './trip-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BookingsStore } from '../../state/bookings.store';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      providers: [BookingsStore],
      imports:[
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ TripListComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store },
            { provide: AuthService, useValue: a.auth }] })
    .compileComponents();

    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function setup() {
    const store = autoSpy(Store<AppState>);
    store.select.and.returnValue(EMPTY);
    const router = autoSpy(Router);
    router.navigate.and.returnValue(new Promise(res => {}));
    const auth = autoSpy(AuthService);
    
    const local = autoSpy(BookingsStore);
    
    const builder = {
        store,
        router,
        auth,
        local,
        default() {
            return builder;
        },
        build() {
            return new TripListComponent(store, router, auth, local);
        }
    }
    return builder;
}