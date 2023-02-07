import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DataShareService } from 'src/app/services/data-share.service';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ RegisterComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store },
            { provide: DataShareService, useValue: a.msg },
            { provide: Store<Notification>, useValue: a.authStore }] })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

function setup() {
    const store = autoSpy(Store<AppState>);
    
    const msg = autoSpy(DataShareService);
    
    const authStore = autoSpy(Store<Notification>);
    authStore.select.and.returnValue(EMPTY);
    const builder = {
        store,
        msg,
        authStore,
        default() {
            return builder;
        },
        build() {
            return new RegisterComponent(store, msg, authStore);
        }
    }
    return builder;
}