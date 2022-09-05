import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, exhaustMap, filter, map, mergeMap, of, switchMap, take, withLatestFrom } from "rxjs";
import { DataService } from "src/app/services/data.service";
import * as api_actions from '../actions/api-calls.actions';
import { IArrival, ILine, IRoute } from "../entities/dataInterfaces";
import { AppState } from "../reducers/api-reducer";
import { routeDetails, selectAllLines } from "../selectors/appState.selectors";

@Injectable()
export class ApiEffects{

    constructor(private dataService: DataService, private actions$: Actions, private store: Store<AppState>){}

    loadRoutes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.requests.getRoutes),
            withLatestFrom(this.store.select(selectAllLines)),
            filter(([action, lines]) => lines.length == 0),
            exhaustMap(()=>this.dataService.getAllLines('webGetLinesWithMLInfo').pipe(
                map((res: ILine[])=>api_actions.requests.getRoutesSuccess({data: res}))
            )  
        )     
    ));

    loadRouteDetails$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.requests.getLineRoutes),
            withLatestFrom(this.store.select(routeDetails)),
            filter(([action, details]) => !details),
            switchMap(([action, details]) => this.dataService.getRouteDetails(action.code).pipe(
                switchMap((res: any) => [
                    api_actions.requests.getLineRoutesSuccess({details: res}),
                    api_actions.requests.getRouteDetails({routeCode: res[0]})
                ])
            ))
    ));

    loadRoutePath$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.requests.getRouteDetails),
            mergeMap((action)=>this.dataService.getRouteDetailsAndStops(action.routeCode).pipe(
                map((res: IRoute)=>api_actions.requests.getRouteDetailsuccess({details: res}))
            )
        )
    ));

    loadStationArrivals$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.requests.getStationsArrivals),
            switchMap((action)=> this.dataService.getStationArrivals(action.stopCode)),
            map((res: IArrival)=> api_actions.requests.getStationsArrivalsSuccess({data: res}))
        )
                
    );
}
