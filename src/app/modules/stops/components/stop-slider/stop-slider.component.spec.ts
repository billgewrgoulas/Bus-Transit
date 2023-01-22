import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSliderComponent } from './stop-slider.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('StopSliderComponent', () => {
  let component: StopSliderComponent;
  let fixture: ComponentFixture<StopSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ StopSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
