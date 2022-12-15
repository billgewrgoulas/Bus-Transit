import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopDropDownComponent } from './stop-drop-down.component';

describe('StopDropDownComponent', () => {
  let component: StopDropDownComponent;
  let fixture: ComponentFixture<StopDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopDropDownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
