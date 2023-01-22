import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsMapComponent } from './stops-map.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

describe('StopsMapComponent', () => {
  let component: StopsMapComponent;
  let fixture: ComponentFixture<StopsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ StopsMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
