import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesSliderComponent } from './places-slider.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('PlacesSliderComponent', () => {
  let component: PlacesSliderComponent;
  let fixture: ComponentFixture<PlacesSliderComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ PlacesSliderComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store }] })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesSliderComponent);
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
    const builder = {
        store,
        default() {
            return builder;
        },
        build() {
            return new PlacesSliderComponent(store);
        }
    }
    return builder;
}