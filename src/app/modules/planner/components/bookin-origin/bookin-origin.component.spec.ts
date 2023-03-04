import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinOriginComponent } from './bookin-origin.component';

describe('BookinOriginComponent', () => {
  let component: BookinOriginComponent;
  let fixture: ComponentFixture<BookinOriginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookinOriginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookinOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
