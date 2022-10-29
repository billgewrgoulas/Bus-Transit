import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, filter, map, mapTo, of, Subject, switchMap, takeUntil, tap, timer, withLatestFrom } from "rxjs";
import { DataService } from "src/app/services/data.service";
import * as api_actions from '../actions/api-calls.actions';
import { AppState } from "../reducers/api-reducer";
import { getAllLines, getRouteStops, selectAll, selectAllLines, selectCurrentLineRoutes, selectLine, selectRoute } from "../selectors/appState.selectors";
import { ILine } from "../entities/line.entity";
import { IRoute, IRouteInfo } from "../entities/route.entity";

@Injectable()
export class ApiEffects{

    constructor(private dataService: DataService, private actions$: Actions, private store: Store<AppState>){}

    loadLines$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getLines),
            withLatestFrom(this.store.select(getAllLines)),
            filter(([action, lines]) => lines.length == 0),
            exhaustMap(() => this.dataService.getAllLines()),
            map((response: ILine[]) => api_actions.getLinesSuccess({lines: response}))
        )     
    );

    loadLineRoutes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getLineRoutes),
            concatLatestFrom((action) => this.store.select(selectCurrentLineRoutes)),
            filter(([action, routes]) => routes.length == 0),
            switchMap(([action, line]) => this.dataService.getLineRoutes(action.id)),
            map((response: IRoute[]) => api_actions.getLineRoutesSuccess({routes: response})),
        )
    );

    loadRouteInfo$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getRouteDetails),
            concatLatestFrom((action) => this.store.select(getRouteStops)),
            filter(([action, stops]) => stops.length == 0),
            switchMap(([action, route]) => this.dataService.getRouteDetails(action.code)),
            map((response: IRouteInfo) => api_actions.getRouteDetailsuccess({routeInfo: response}))
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
