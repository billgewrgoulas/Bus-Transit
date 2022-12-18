import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSliderComponent } from './stop-slider.component';

describe('StopSliderComponent', () => {
  let component: StopSliderComponent;
  let fixture: ComponentFixture<StopSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
