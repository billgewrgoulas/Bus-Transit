import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, filter, map, mapTo, of, Subject, switchMap, takeUntil, tap, timer, withLatestFrom } from "rxjs";
import { DataService } from "src/app/services/data.service";
import * as api_actions from '../actions/api-calls.actions';
import { AppState } from "../reducers/api-reducer";
import { currentLine, routeStopCodes, schedDetails, selectAllLines, selectLine, selectRoute } from "../selectors/appState.selectors";
import { ILine } from "../entities/line.entity";

@Injectable()
export class ApiEffects{

    constructor(private dataService: DataService, private actions$: Actions, private store: Store<AppState>){}

    loadLines$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getLines),
            withLatestFrom(this.store.select(selectAllLines)),
            filter(([action, lines]) => lines.length == 0),
            exhaustMap(() => this.dataService.getAllLines()),
            map((res: ILine[]) => api_actions.getLinesSuccess({data: res}))
        )     
    );

    loadLineRoutes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getLineRoutes),
            concatLatestFrom((action) => this.store.select(selectLine(action.id))),
            filter(([action, line]) => !line?.routeCodes),
            switchMap(([action, line]) => this.dataService.getLineRoutes(action.id)),
            map((res) => api_actions.getLineRoutesSuccess({routes: res})),
        )
    );

    loadRouteInfo$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getRouteDetails),
            concatLatestFrom((action) => this.store.select(selectRoute(action.code))),
            filter(([action, route]) => !route?.stopCodes),
            switchMap(([action, route]) => this.dataService.getRouteDetails(action.code)),
            map((response) => api_actions.getRouteDetailsuccess({routeInfo: response}))
        )
    );

    // getArrivalUpdates$ = createEffect(()=>
    //     this.actions$.pipe(
    //         ofType(api_actions.requests.getRouteDetailsuccess, api_actions.requests.updateArrivals),
    //         withLatestFrom(this.store.select(routeStopCodes)),
    //         filter(([action, stopCodes]) => !!stopCodes),
    //         switchMap(([action, stopCodes])=> timer(0, 20000).pipe(
    //             switchMap(() => this.dataService.getArrivalUpdates(stopCodes)), 
    //             takeUntil(this.actions$.pipe(ofType(api_actions.requests.stopUpdates)))
    //         )),
    //         filter((res: IArrival[]) => !!res),
    //         map((res: IArrival[])=> api_actions.requests.getStationsArrivalsSuccess({data: res}))
    //     )
    // );

    // getBusLocations$ = createEffect(() => 
    //     this.actions$.pipe(
    //         ofType(api_actions.requests.updateBusLocations),
    //         switchMap((action) => timer(0, 10000).pipe(
    //             switchMap(() => this.dataService.getBusLocations(action.routeCode)),
    //             takeUntil(this.actions$.pipe(ofType(api_actions.requests.stopBusLocationUpdates)))
    //         )),
    //         filter((res: IRouteVeh) => !!res),
    //         map((res: IRouteVeh) => api_actions.requests.busLocationsFetched({data: res}))
    //     )
    // );

}
