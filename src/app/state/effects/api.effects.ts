import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { concatMap, exhaustMap, filter, map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs";
import { DataService } from "src/app/services/data.service";
import * as api_actions from '../actions/api-calls.actions';
import { AppState } from "../reducers/api-reducer";
import { selectAllLines, selectLine } from "../selectors/appState.selectors";
import { ILine } from "../entities/line.entity";

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
            ])
    ));

    // loadRoutePath$ = createEffect(()=>
    //     this.actions$.pipe(
    //         ofType(api_actions.requests.getRouteDetails),
    //         mergeMap((action)=>this.dataService.getRouteDetailsAndStops(action.routeCode).pipe(
    //             map((res: IRoute)=>api_actions.requests.getRouteDetailsuccess({details: res, code: action.routeCode}))
    //         )
    //     )
    // ));

    // loadStationArrivals$ = createEffect(()=>
    //     this.actions$.pipe(
    //         ofType(api_actions.requests.getStationsArrivals),
    //         switchMap((action)=> this.dataService.getStationArrivals(action.stopCode)),
    //         map((res: IArrival)=> api_actions.requests.getStationsArrivalsSuccess({data: res}))
    //     )
                
    // );
}
