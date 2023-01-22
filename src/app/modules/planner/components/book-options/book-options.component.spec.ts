import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOptionsComponent } from './book-options.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('BookOptionsComponent', () => {
  let component: BookOptionsComponent;
  let fixture: ComponentFixture<BookOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
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
