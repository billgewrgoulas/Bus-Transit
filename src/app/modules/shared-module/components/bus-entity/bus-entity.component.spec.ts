import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusEntityComponent } from './bus-entity.component';

describe('BusEntityComponent', () => {
  let component: BusEntityComponent;
  let fixture: ComponentFixture<BusEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
