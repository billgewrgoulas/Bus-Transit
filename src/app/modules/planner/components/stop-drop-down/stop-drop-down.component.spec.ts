import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopDropDownComponent } from './stop-drop-down.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DirectionsStore } from '../../state/directions.store';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('StopDropDownComponent', () => {
  let component: StopDropDownComponent;
  let fixture: ComponentFixture<StopDropDownComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      providers: [DirectionsStore],
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ StopDropDownComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store },
            { provide: DataShareService, useValue: a.msg }] })
    .compileComponents();

    fixture = TestBed.createComponent(StopDropDownComponent);
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
    const local = autoSpy(DirectionsStore);
    
    const builder = {
        store,
        msg,
        router,
        local,
        default() {
            return builder;
        },
        build() {
            return new StopDropDownComponent(store, msg, router, local);
        }
    }
    return builder;
}