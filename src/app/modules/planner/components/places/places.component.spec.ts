import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesComponent } from './places.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DirectionsStore } from '../../state/directions.store';
import { ActivatedRoute } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { autoSpy } from 'auto-spy';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('PlacesComponent', () => {
  let component: PlacesComponent;
  let fixture: ComponentFixture<PlacesComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      providers: [DirectionsStore],
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ PlacesComponent ]
    }).configureTestingModule({ providers: [{ provide: ActivatedRoute, useValue: a.route },
            { provide: DataShareService, useValue: a.msg },
            { provide: Store<AppState>, useValue: a.store }] })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
});

function setup() {
    const route = autoSpy(ActivatedRoute);
    
    const local = autoSpy(DirectionsStore);
    
    const msg = autoSpy(DataShareService);
    
    const store = autoSpy(Store<AppState>);
    const builder = {
        route,
        local,
        msg,
        store,
        default() {
            return builder;
        },
        build() {
            return new PlacesComponent(route, local, msg, store);
        }
    }
    return builder;
}