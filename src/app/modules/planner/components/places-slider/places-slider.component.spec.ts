import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesSliderComponent } from './places-slider.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('PlacesSliderComponent', () => {
  let component: PlacesSliderComponent;
  let fixture: ComponentFixture<PlacesSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ PlacesSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
