import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, map, of, switchMap, take, tap, withLatestFrom } from "rxjs";
import { DataService } from "src/app/services/data.service";
import * as api_actions from '../Actions/api-calls.actions';
import { AppState } from "../Reducers/api-reducer";
import { getActiveRouteSchedules, getAllStops, selectCurrentLineRoutes, selectRoutePoints } from "../Selectors/appState.selectors";
import { ILine } from "../Entities/line.entity";
import { IRoute, IRouteInfo } from "../Entities/route.entity";
import { IScheduleDetails } from "../Entities/schedule.entity";
import { IStop } from "../Entities/stop.entity";
import { Plan } from "../Entities/itinerary";
import { Booking } from "../Entities/booking.entity";

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
            switchMap(() => this.dataService.getAllLines().pipe(
                map((response: ILine[]) => api_actions.getLinesSuccess({lines: response})),
                catchError((err) => of(api_actions.getLinesError({msg: err.error})))
            )),
        )     
    );

    loadLineRoutes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getLineRoutes),
            withLatestFrom(this.store.select(selectCurrentLineRoutes)),
            filter(([action, routes]) => routes.length == 0),
            switchMap(([action, line]) => this.dataService.getLineRoutes(action.id).pipe(
                map((response: IRoute[]) => api_actions.getLineRoutesSuccess({routes: response})),
                catchError(err => of(api_actions.getLineRoutesError({msg: err.error})))
            )),
        )
    );

    loadRouteInfo$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getRouteDetails),
            concatLatestFrom((action) => this.store.select(selectRoutePoints(action.code))),
            filter(([action, points]) => !points || points.length === 0),
            switchMap(([action, points]) => this.dataService.getRouteDetails(action.code).pipe(
                map((response: IRouteInfo) => api_actions.getRouteDetailsuccess({routeInfo: response})),
                catchError(err => of(api_actions.getRouteDetailsError({msg: err.error})))
            )),
        )
    );

    loadRouteSchedules$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.getSchedules),
            withLatestFrom(this.store.select(getActiveRouteSchedules)),
            filter(([action, schedules]) => !schedules),
            switchMap(([action]) => this.dataService.getRouteSchedules(action.code).pipe(
                map((response: IScheduleDetails) => api_actions.getSchedulesSuccess({schedules: response})),
                catchError(err => of(api_actions.getSchedulesError({msg: err.error})))
            )),
        )
    );

    loadStopRoutes$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.stopRoutes),
            switchMap((action) => this.dataService.getRoutesByStop(action.stopCode).pipe(
                map((response: IRoute[]) => api_actions.stopRoutesSuccess({routes: response})),
                catchError(err => of(api_actions.stopRoutesError({msg: err.error})))
            ))
        )
    );

    loadPlans$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.fetchPlan),
            filter(({data}) => !!data),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap(({data}) => this.dataService.getPlan(data).pipe(
                map((response: Plan) => api_actions.fetchPlanSuccess({data: response})),
                catchError(err => of(api_actions.fetchPlanError({msg: err})))
            ))
        )
    );

    loadBookingPlan$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.getItinerary),
            filter(({data}) => !!data),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap(({data}) => this.dataService.getBookingPlan(data).pipe(
                map((response: Plan) => api_actions.fetchPlanSuccess({data: response})),
                catchError(err => of(api_actions.fetchPlanError({msg: err})))
            )),
        )
    );

    loadBookings$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.fetchBookings),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap(() => this.dataService.getBookings().pipe(
                map((res: Booking[]) => api_actions.fetchBookingsSuccess({data: res})),
                catchError(err => of(api_actions.fetchBookingsError({msg: err.error.error})))
            )),
        )
    );

    loadStops$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getStops),
            withLatestFrom(this.store.select(getAllStops)),
            filter(([action, stops]) => stops.length == 0),
            switchMap(() => this.dataService.getAllStops().pipe(
                map((response: IStop[]) => api_actions.getStopsSuccess({stops: response})),
                catchError(err => of(api_actions.getStopsError({msg: err})))
            ))      
        )     
    );

    saveStop$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.saveStop),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap((action) => this.dataService.saveStop(action.code).pipe(
                map((res: any) => api_actions.saveStopSuccess({code: action.code})),
                catchError(err => of(api_actions.saveStopError({msg: err})))
            ))      
        )     
    );

    deleteStop$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.deleteStop),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap((action) => this.dataService.deleteStop(action.code).pipe(
                map((res: any) => api_actions.deleteStopSuccess({code: action.code})),
                catchError(err => of(api_actions.deleteStopError({msg: err})))
            ))      
        )     
    );

    getSavedStops$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getSavedStops), take(1),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap((action) => this.dataService.getSavedStops().pipe(
                map((res: any) => api_actions.getSavedStopsSuccess({codes: res})),
                catchError(err => of(api_actions.getSavedStopsError({msg: err})))
            ))      
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
