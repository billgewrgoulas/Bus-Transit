import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesComponent } from './places.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { DirectionsStore } from '../../state/directions.store';

describe('PlacesComponent', () => {
  let component: PlacesComponent;
  let fixture: ComponentFixture<PlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DirectionsStore],
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ PlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
