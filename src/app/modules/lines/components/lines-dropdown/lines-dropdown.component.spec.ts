import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesDropdownComponent } from './lines-dropdown.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('LinesDropdownComponent', () => {
  let component: LinesDropdownComponent;
  let fixture: ComponentFixture<LinesDropdownComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ LinesDropdownComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store }] })
    .compileComponents();

    fixture = TestBed.createComponent(LinesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
});

function setup() {
    const router = autoSpy(Router);
    router.navigate.and.returnValue(new Promise(res => {}));
    const store = autoSpy(Store<AppState>);
    store.select.and.returnValue(EMPTY);
    const builder = {
        router,
        store,
        default() {
            return builder;
        },
        build() {
            return new LinesDropdownComponent(router, store);
        }
    }
    return builder;
}