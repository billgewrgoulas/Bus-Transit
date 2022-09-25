
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, tap, withLatestFrom } from "rxjs";
import * as actions from '../actions/socketIO.actions';
import { AppState } from "../reducers/api-reducer";
import { SocketIOService } from "src/app/services/socket-io.service";
import { selectCurrentRoute } from "../selectors/router.reducer";
import { currentRoute } from "../selectors/appState.selectors";

@Injectable()
export class SocketEffects{

    private arrivalTimer: NodeJS.Timer | undefined;

    constructor(private io: SocketIOService, private actions$: Actions, private store: Store<AppState>){}

    updateArrivals$ = createEffect(()=>
        this.actions$.pipe(ofType(actions.SocketActions.updateArrivals), 
        tap(()=> this.arrivalTimer = setInterval(()=>this.io.updateAll(), 15000))), 
        {dispatch: false}
    );

    cancelArrivals$ = createEffect(()=>
        this.actions$.pipe(ofType(actions.SocketActions.stopUpdates), 
        tap(()=> {clearInterval(this.arrivalTimer); this.arrivalTimer = undefined;})), 
        {dispatch: false}
    );

    updateBusLocations$ = createEffect(()=>
        this.actions$.pipe(ofType(actions.SocketActions.updateBusLocations),
        withLatestFrom(this.store.select(currentRoute)),
        filter(([action, route]) => !!route?.RouteCode),
        map(([action, route]) => route?.RouteCode),
        tap((routeCode)=> this.io.getBusUpdates(routeCode))),
        {dispatch: false}
    );

    cancelBusLocations$ = createEffect(()=>
        this.actions$.pipe(ofType(actions.SocketActions.stopBusLocationUpdates),
        tap(()=> this.io.cancelBusUpdates())),
        {dispatch: false}
    );

}
