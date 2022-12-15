import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesDropdownComponent } from './lines-dropdown.component';

describe('LinesDropdownComponent', () => {
  let component: LinesDropdownComponent;
  let fixture: ComponentFixture<LinesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinesDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
