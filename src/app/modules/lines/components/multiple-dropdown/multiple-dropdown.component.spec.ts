import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDropdownComponent } from './multiple-dropdown.component';

describe('MultipleDropdownComponent', () => {
  let component: MultipleDropdownComponent;
  let fixture: ComponentFixture<MultipleDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
