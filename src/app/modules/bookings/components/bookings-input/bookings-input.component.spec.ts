import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsInputComponent } from './bookings-input.component';

describe('BookingsInputComponent', () => {
  let component: BookingsInputComponent;
  let fixture: ComponentFixture<BookingsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
