import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteListComponent } from './route-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('RouteListComponent', () => {
  let component: RouteListComponent;
  let fixture: ComponentFixture<RouteListComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ RouteListComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store }] })
    .compileComponents();

    fixture = TestBed.createComponent(RouteListComponent);
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
    const builder = {
        store,
        router,
        default() {
            return builder;
        },
        build() {
            return new RouteListComponent(store, router);
        }
    }
    return builder;
}