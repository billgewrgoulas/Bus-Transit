import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesDropdownComponent } from './lines-dropdown.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('LinesDropdownComponent', () => {
  let component: LinesDropdownComponent;
  let fixture: ComponentFixture<LinesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
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
