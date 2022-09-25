import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, filter, map, switchMap, tap, withLatestFrom } from "rxjs";
import { DataService } from "src/app/services/data.service";
import * as api_actions from '../actions/api-calls.actions';
import { AppState } from "../reducers/api-reducer";
import { selectAllLines, selectLine, selectRoute } from "../selectors/appState.selectors";
import { ILine } from "../entities/line.entity";
import { IArrival } from "../entities/arival.entity";

@Injectable()
export class ApiEffects{

    constructor(private dataService: DataService, private actions$: Actions, private store: Store<AppState>){}

    loadRoutes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.requests.getRoutes),
            withLatestFrom(this.store.select(selectAllLines)),
            filter(([action, lines]) => lines.length == 0),
            exhaustMap(()=>this.dataService.getAllLines('lines').pipe(
                map((res: ILine[]) => api_actions.requests.getRoutesSuccess({data: res}))
            )  
        )     
    ));

    loadLineRoutes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.requests.getLineRoutes),
            concatLatestFrom((action) => this.store.select(selectLine(action.lineCode))),
            filter(([action, line]) => !line?.routeCodes),
            switchMap(([action, line]) => this.dataService.getLineRoutes(action.lineCode)),
            switchMap((data) => [
                api_actions.requests.getLineRoutesSuccess({data: data, lineCode: data[0]['LineCode']}),
            ]),
    ));

    loadRoutePath$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.requests.getRouteDetails),
            concatLatestFrom((action) => this.store.select(selectRoute(action.routeCode))),
            filter(([action, route]) => !route?.stopCodes),
            switchMap(([action, route]) => this.dataService.getRouteDetailsAndStops(action.routeCode)),
            switchMap((response) => [
                api_actions.requests.getRouteDetailsuccess({data: response, code: response.routeCode})
            ])
        )
    );

    loadStationArrivals$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.requests.getStationsArrivals),
            switchMap((action)=> this.dataService.getStationArrivals(action.stopCode)),
            map((res: IArrival)=> api_actions.requests.getStationsArrivalsSuccess({data: res}))
        )  
    );

}
