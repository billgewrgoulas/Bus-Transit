import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSliderComponent } from './saved-slider.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('SavedSliderComponent', () => {
  let component: SavedSliderComponent;
  let fixture: ComponentFixture<SavedSliderComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ SavedSliderComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store },
            { provide: DataShareService, useValue: a.msg }] })
    .compileComponents();

    fixture = TestBed.createComponent(SavedSliderComponent);
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
    const router = autoSpy(Router);
    router.navigate.and.returnValue(new Promise(res => {}));
    const msg = autoSpy(DataShareService);
    
    const builder = {
        store,
        router,
        msg,
        default() {
            return builder;
        },
        build() {
            return new SavedSliderComponent(store, router, msg);
        }
    }
    return builder;
}