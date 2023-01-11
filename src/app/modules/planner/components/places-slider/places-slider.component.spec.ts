import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesSliderComponent } from './places-slider.component';

describe('PlacesSliderComponent', () => {
  let component: PlacesSliderComponent;
  let fixture: ComponentFixture<PlacesSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
