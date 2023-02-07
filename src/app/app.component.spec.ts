import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StoreModule, Store } from '@ngrx/store';
import { SocketIOService } from './services/socket-io.service';
import { autoSpy } from 'auto-spy';
import { Router } from '@angular/router';


describe('AppComponent', () => {
  beforeEach(async () => {    const a = setup().default();
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        AppComponent
      ],
    }).configureTestingModule({ providers: [{ provide: SocketIOService, useValue: a.io }] }).configureTestingModule({ providers: [{ provide: SocketIOService, useValue: a.io }] }).configureTestingModule({ providers: [{ provide: SocketIOService, useValue: a.io }] }).compileComponents();
  });
    
    it('when onResize is called it should', () => {
        // arrange
        const { build } = setup().default();
        const a = build();
        // act
        a.onResize();
        // assert
        // expect(a).toEqual
    });

});

function setup() {
    const router = autoSpy(Router);
    
    const store = autoSpy(Store);
    const io = autoSpy(SocketIOService);
    const builder = {
        router,
        store,
        io,
        default() {
            return builder;
        },
        build() {
            return new AppComponent(io, router, store);
        }
    }
    return builder;
}