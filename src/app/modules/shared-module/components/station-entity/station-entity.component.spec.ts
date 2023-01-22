import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationEntityComponent } from './station-entity.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('StationEntityComponent', () => {
  let component: StationEntityComponent;
  let fixture: ComponentFixture<StationEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        StoreModule.forRoot({})
      ],
      declarations: [ StationEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
