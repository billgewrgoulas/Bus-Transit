import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { distinctUntilChanged, exhaustMap, filter, map, mapTo, of, Subject, switchMap, take, takeUntil, tap, timer, withLatestFrom } from "rxjs";
import { DataService } from "src/app/services/data.service";
import * as api_actions from '../Actions/api-calls.actions';
import { AppState } from "../Reducers/api-reducer";
import { getActiveRouteSchedules, getAllLines, getAllStops, getRouteStops, selectAll, selectAllLines, selectCurrentLineRoutes, selectLine, selectRoute, selectRoutePoints } from "../Selectors/appState.selectors";
import { ILine } from "../Entities/line.entity";
import { IRoute, IRouteInfo } from "../Entities/route.entity";
import { IScheduleDetails } from "../Entities/schedule.entity";
import { IStop } from "../Entities/stop.entity";
import { Plan } from "../Entities/itinerary";

@Injectable()
export class ApiEffects{

    constructor(private dataService: DataService, private actions$: Actions, private store: Store<AppState>){}

    loadLines$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getLines),
            take(1),
            switchMap(() => this.dataService.getAllLines()),
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

    loadFilteredStops$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.getFilteredStops),
            switchMap((action) => this.dataService.getFilteredStops(action.stopCode)),
            map((response: IStop[]) => api_actions.getFilteredStopsSuccess({stops: response}))
        )
    );

    loadSearchedPaths$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.getFilteredRoutes),
            switchMap((action) => this.dataService.getFilteredRoutes(action.data)),
            map((res: IRoute[]) => api_actions.routesFilteredSuccess({routes: res, add: undefined}))
        )
    );

    loadPlans$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.fetchPlan),
            filter(({data}) => !!data),
            switchMap(({data}) => this.dataService.getPlan(data)),
            map((response: Plan) => api_actions.fetchPlanSuccess({data: response}))
        )
    );

    loadStops$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getStops),
            withLatestFrom(this.store.select(getAllStops)),
            filter(([action, stops]) => stops.length == 0),
            switchMap(() => this.dataService.getAllStops()),
            map((response: IStop[]) => api_actions.getStopsSuccess({stops: response}))
        )     
    );

}
