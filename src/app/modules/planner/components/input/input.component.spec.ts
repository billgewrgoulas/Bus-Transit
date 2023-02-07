import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { autoSpy } from 'auto-spy';
import { DirectionsStore } from '../../state/directions.store';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      providers: [DirectionsStore],
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ InputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
});

function setup() {
    const local = autoSpy(DirectionsStore);
    
    const router = autoSpy(Router);
    router.navigate.and.returnValue(new Promise(res => {}));
    const builder = {
        local,
        router,
        default() {
            return builder;
        },
        build() {
            return new InputComponent(local, router);
        }
    }
    return builder;
}