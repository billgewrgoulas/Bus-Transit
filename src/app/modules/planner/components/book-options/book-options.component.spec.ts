import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOptionsComponent } from './book-options.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { autoSpy } from 'auto-spy';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('BookOptionsComponent', () => {
  let component: BookOptionsComponent;
  let fixture: ComponentFixture<BookOptionsComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ BookOptionsComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store }] })
    .compileComponents();

    fixture = TestBed.createComponent(BookOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
});

function setup() {
    const router = autoSpy(Router);
    router.navigate.and.returnValue(new Promise(res => {}));
    const store = autoSpy(Store<AppState>);
    const builder = {
        router,
        store,
        default() {
            return builder;
        },
        build() {
            return new BookOptionsComponent(router, store);
        }
    }
    return builder;
}