import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOptionsComponent } from './book-options.component';

describe('BookOptionsComponent', () => {
  let component: BookOptionsComponent;
  let fixture: ComponentFixture<BookOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
