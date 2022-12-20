import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, map, of, switchMap, take, tap, withLatestFrom } from "rxjs";
import { DataService } from "src/app/services/data.service";
import * as api_actions from '../Actions/api-calls.actions';
import * as nav_actions from '../Actions/navigation.actions';
import { AppState } from "../Reducers/api-reducer";
import { getActiveRouteSchedules, getAllStops, newBooking, selectCurrentLineRoutes, selectRoutePoints } from "../Selectors/appState.selectors";
import { ILine } from "../Entities/line.entity";
import { IRoute, IRouteInfo } from "../Entities/route.entity";
import { IScheduleDetails } from "../Entities/schedule.entity";
import { IStop } from "../Entities/stop.entity";
import { Plan } from "../Entities/itinerary";
import { Router } from "@angular/router";

@Injectable()
export class ApiEffects{

    constructor(
        private dataService: DataService, 
        private actions$: Actions, 
        private store: Store<AppState>,
    ){}

    loadLines$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getLines), take(1),
            switchMap(() => this.dataService.getAllLines()),
            map((response: ILine[]) => api_actions.getLinesSuccess({lines: response}))
        )     
    );

    loadLineRoutes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getLineRoutes),
            withLatestFrom(this.store.select(selectCurrentLineRoutes)),
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

    loadStopRoutes$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.stopRoutes),
            switchMap((action) => this.dataService.getRoutesByStop(action.stopCode)),
            map((response: IRoute[]) => api_actions.stopRoutesSuccess({routes: response}))
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

    book$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.book),
            concatLatestFrom((action) => this.store.select(newBooking(action.email, action.it))),
            filter(([action, data]) => data.length > 0),
            switchMap(([action, data]) => this.dataService.book(data)),
            map(res => api_actions.bookSuccess({data: res}))
        )
    );

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.login),
            switchMap((action) => this.dataService.login(action.data).pipe(
                map(res => api_actions.loginSuccess({data: res})),
                catchError((err) => of(api_actions.loginError({msg: err})))
            )),
        )
    );

    register$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.register),
            switchMap((action) => this.dataService.register(action.credentials).pipe(
                map(res => api_actions.registerSuccess({data: res})),
                catchError((err) => of(api_actions.registerError({msg: err}))),
            )),
        )
    );

}
