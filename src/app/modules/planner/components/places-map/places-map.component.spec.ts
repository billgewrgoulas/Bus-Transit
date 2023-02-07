import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesMapComponent } from './places-map.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('PlacesMapComponent', () => {
  let component: PlacesMapComponent;
  let fixture: ComponentFixture<PlacesMapComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      declarations: [ PlacesMapComponent ],
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
});

function setup() {
    const builder = {
        default() {
            return builder;
        },
        build() {
            return new PlacesMapComponent();
        }
    }
    return builder;
}