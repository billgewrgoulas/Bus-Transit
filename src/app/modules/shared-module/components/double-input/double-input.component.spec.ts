import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleInputComponent } from './double-input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('DoubleInputComponent', () => {
  let component: DoubleInputComponent;
  let fixture: ComponentFixture<DoubleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        StoreModule.forRoot({})
      ],
      declarations: [ DoubleInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
