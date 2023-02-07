import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesMapComponent } from './lines-map.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('LinesMapComponent', () => {
  let component: LinesMapComponent;
  let fixture: ComponentFixture<LinesMapComponent>;

  beforeEach(async () => {    const a = setup().default();
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

function setup() {
    const builder = {
        default() {
            return builder;
        },
        build() {
            return new LinesMapComponent();
        }
    }
    return builder;
}