import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteDetailsComponent } from './route-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LiveDataStore } from 'src/app/modules/lines/state/live.data.store';
import { AuthService } from 'src/app/services/auth.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { autoSpy } from 'auto-spy';
import { EMPTY } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';
 
describe('RouteDetailsComponent', () => {
  let component: RouteDetailsComponent;
  let fixture: ComponentFixture<RouteDetailsComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [ RouteDetailsComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store },
            { provide: LiveDataStore, useValue: a.localStore },
            { provide: AuthService, useValue: a.auth },
            { provide: DataShareService, useValue: a.msg }] })
    .compileComponents();

    fixture = TestBed.createComponent(RouteDetailsComponent);
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
    const localStore = autoSpy(LiveDataStore);
    
    const auth = autoSpy(AuthService);
    const msg = autoSpy(DataShareService);
    
    const builder = {
        store,
        localStore,
        auth,
        msg,
        default() {
            return builder;
        },
        build() {
            return new RouteDetailsComponent(store, localStore, auth, msg);
        }
    }
    return builder;
}