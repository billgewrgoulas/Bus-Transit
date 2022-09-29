import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationEntityComponent } from './station-entity.component';

describe('StationEntityComponent', () => {
  let component: StationEntityComponent;
  let fixture: ComponentFixture<StationEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
