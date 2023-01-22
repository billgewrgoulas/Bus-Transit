import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDropdownComponent } from './multiple-dropdown.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('MultipleDropdownComponent', () => {
  let component: MultipleDropdownComponent;
  let fixture: ComponentFixture<MultipleDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        StoreModule.forRoot({})
      ],
      declarations: [ MultipleDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
