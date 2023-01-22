import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesMapComponent } from './lines-map.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('LinesMapComponent', () => {
  let component: LinesMapComponent;
  let fixture: ComponentFixture<LinesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ LinesMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
