import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopDropDownComponent } from './stop-drop-down.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { DirectionsStore } from '../../state/directions.store';

describe('StopDropDownComponent', () => {
  let component: StopDropDownComponent;
  let fixture: ComponentFixture<StopDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DirectionsStore],
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
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
