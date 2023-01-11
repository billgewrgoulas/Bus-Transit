import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSliderComponent } from './saved-slider.component';

describe('SavedSliderComponent', () => {
  let component: SavedSliderComponent;
  let fixture: ComponentFixture<SavedSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
