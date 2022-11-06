import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, filter, map, mapTo, of, Subject, switchMap, takeUntil, tap, timer, withLatestFrom } from "rxjs";
import { DataService } from "src/app/services/data.service";
import * as api_actions from '../actions/api-calls.actions';
import { AppState } from "../reducers/api-reducer";
import { getActiveRouteSchedules, getAllLines, getRouteStops, selectAll, selectAllLines, selectCurrentLineRoutes, selectLine, selectRoute, selectRoutePoints } from "../selectors/appState.selectors";
import { ILine } from "../entities/line.entity";
import { IRoute, IRouteInfo } from "../entities/route.entity";
import { IScheduleDetails } from "../entities/schedule.entity";
import { IStop } from "../entities/stop.entity";

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

    loadStops$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getStops),
            withLatestFrom(this.store.select(getAllLines)),
            exhaustMap(() => this.dataService.getAllStops()),
            map((response: IStop[]) => api_actions.getStopsSuccess({stops: response}))
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
            concatLatestFrom((action) => this.store.select(selectRoutePoints(action.code))),
            filter(([action, points]) => !points || points.length === 0),
            switchMap(([action, points]) => this.dataService.getRouteDetails(action.code)),
            map((response: IRouteInfo) => api_actions.getRouteDetailsuccess({routeInfo: response}))
        )
    );

    loadRouteSchedules$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.getSchedules),
            withLatestFrom(this.store.select(getActiveRouteSchedules)),
            filter(([action, schedules]) => !schedules),
            switchMap(([action]) => this.dataService.getRouteSchedules(action.code)),
            map((response: IScheduleDetails) => api_actions.getSchedulesSuccess({schedules: response}))
        )
    );

}
