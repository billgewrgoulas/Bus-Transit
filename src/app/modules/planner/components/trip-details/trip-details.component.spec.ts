import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsComponent } from './trip-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('TripDetailsComponent', () => {
  let component: TripDetailsComponent;
  let fixture: ComponentFixture<TripDetailsComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ TripDetailsComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store },
            { provide: DataShareService, useValue: a.msg }] })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetailsComponent);
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
    const msg = autoSpy(DataShareService);
    
    const router = autoSpy(Router);
    router.navigate.and.returnValue(new Promise(res => {}));
    const builder = {
        store,
        msg,
        router,
        default() {
            return builder;
        },
        build() {
            return new TripDetailsComponent(store, msg, router);
        }
    }
    return builder;
}