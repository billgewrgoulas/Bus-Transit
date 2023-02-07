import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DataShareService } from 'src/app/services/data-share.service';
import { autoSpy } from 'auto-spy';
import { AppState } from 'src/app/state/Reducers/api-reducer';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ SelectComponent ]
    }).configureTestingModule({ providers: [{ provide: Store<AppState>, useValue: a.store },
            { provide: DataShareService, useValue: a.dataShare }] })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

function setup() {
    const store = autoSpy(Store<AppState>);
    
    const dataShare = autoSpy(DataShareService);
    
    const builder = {
        store,
        dataShare,
        default() {
            return builder;
        },
        build() {
            return new SelectComponent(store, dataShare);
        }
    }
    return builder;
}