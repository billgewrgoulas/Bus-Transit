import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { DataShareService } from 'src/app/services/data-share.service';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import * as assert from 'assert';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[ StoreModule.forRoot({}), RouterTestingModule,],
      declarations: [ LoginComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store },
            { provide: DataShareService, useValue: a.msg },
            { provide: Store<Notification>, useValue: a.auth }] })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
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
    
    const auth = autoSpy(Store<Notification>);
    auth.select.and.returnValue(EMPTY);
    const builder = {
        store,
        msg,
        auth,
        default() {
            return builder;
        },
        build() {
            return new LoginComponent(store, msg, auth);
        }
    }
    return builder;
}