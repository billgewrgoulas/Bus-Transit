import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrComponent } from './qr.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('QrComponent', () => {
  let component: QrComponent;
  let fixture: ComponentFixture<QrComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ QrComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store }] })
    .compileComponents();

    fixture = TestBed.createComponent(QrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function setup() {
    const store = autoSpy(Store<AppState>);
    store.select.and.returnValue(EMPTY);
    const builder = {
        store,
        default() {
            return builder;
        },
        build() {
            return new QrComponent(store);
        }
    }
    return builder;
}