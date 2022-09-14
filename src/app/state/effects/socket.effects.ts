
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import * as actions from '../actions/socketIO.actions';
import { AppState } from "../reducers/api-reducer";
import { SocketIOService } from "src/app/services/socket-io.service";

@Injectable()
export class SocketEffects{

    private arrivalTimer: NodeJS.Timer | undefined;

    constructor(private io: SocketIOService, private actions$: Actions){}

    updateArrivals$ = createEffect(()=>
        this.actions$.pipe(ofType(actions.SocketActions.updateArrivals), 
        tap(()=> this.initiateArrivalUpdates())), 
        {dispatch: false}
    );

    cancelArrivals$ = createEffect(()=>
        this.actions$.pipe(ofType(actions.SocketActions.stopUpdates), 
        tap(()=> this.cancelArrivalUpdates())), 
        {dispatch: false}
    );

    updateBusLocations$ = createEffect(()=>
        this.actions$.pipe(ofType(actions.SocketActions.updateBusLocations),
        tap((action)=> this.io.getBusUpdates(action.routeCode))),
        {dispatch: false}
    );

    cancelBusLocations$ = createEffect(()=>
        this.actions$.pipe(ofType(actions.SocketActions.stopBusLocationUpdates),
        tap(()=> this.io.cancelBusUpdates())),
        {dispatch: false}
    );

    private initiateArrivalUpdates(){
        this.arrivalTimer = setInterval(()=>this.io.updateAll(), 10000);
    }

    private cancelArrivalUpdates(){
        clearInterval(this.arrivalTimer);
        this.arrivalTimer = undefined;
    }
}
