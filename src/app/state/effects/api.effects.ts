import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, map, of, switchMap, take, tap, withLatestFrom } from "rxjs";
import { DataService } from "src/app/services/data.service";
import * as api_actions from '../Actions/api-calls.actions';
import { AppState } from "../Reducers/api-reducer";
import { getActiveRouteSchedules, getAllBookings, getSavedInfo, getSavedRouteCodes, getSavedStopCodes, getStopRoutes, selectCurrentLineRoutes, selectRoutePoints } from "../Selectors/appState.selectors";
import { ILine } from "../Entities/line.entity";
import { IRoute, IRouteInfo } from "../Entities/route.entity";
import { IScheduleDetails } from "../Entities/schedule.entity";
import { IStop } from "../Entities/stop.entity";
import { Plan } from "../Entities/itinerary";
import { Booking } from "../Entities/booking.entity";
import { DataShareService } from "src/app/services/data-share.service";

@Injectable()
export class ApiEffects{

    constructor(
        private dataService: DataService, 
        private actions$: Actions, 
        private store: Store<AppState>,
        private msg: DataShareService
    ){}

    loadLines$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getLines), take(1),
            switchMap(() => this.dataService.getAllLines().pipe(
                map((response: ILine[]) => api_actions.getLinesSuccess({lines: response})),
                catchError((err) => of(api_actions.apiError({msg: err.error})))
            )),
        )     
    );

    loadRoutesAndStop$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getStopAndRoutes), take(1),
            switchMap(() => this.dataService.getRoutesAndStops().pipe(
                map((response) => api_actions.getStopAndRoutesSuccess(response)),
                catchError((err) => of(api_actions.apiError({msg: err.error})))
            )),
        )     
    );
    
    loadRouteInfo$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getRouteDetails),
            concatLatestFrom((action) => this.store.select(selectRoutePoints(action.code))),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap(([action, points]) => this.dataService.getRouteDetails(action.code).pipe(
                map((response: IRouteInfo) => api_actions.getRouteDetailsuccess({routeInfo: response})),
                catchError(err => of(api_actions.apiError({msg: err.error})))
            )),
        )
    );

    loadstopRoutes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.stopRoutes),
            withLatestFrom(this.store.select(getStopRoutes)),
            filter(([action, routes]) => routes.length == 0),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap(([action, routes]) => this.dataService.getRoutesByStop(action.stopCode).pipe(
                map((response: string[]) => api_actions.stopRoutesSuccess({routes: response, stop: action.stopCode})),
                catchError(err => of(api_actions.apiError({msg: err.error})))
            )),
        )
    );

    loadRouteSchedules$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.getSchedules),
            switchMap((action) => this.dataService.getRouteSchedules(action.code).pipe(
                map((response: IScheduleDetails) => api_actions.getSchedulesSuccess({schedules: response})),
                catchError(err => of(api_actions.apiError({msg: err.error})))
            )),
        )
    );

    loadPlans$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.fetchPlan),
            filter(({data}) => !!data),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap(({data}) => this.dataService.getPlan(data).pipe(
                map((response: Plan) => api_actions.fetchPlanSuccess({data: response})),
                catchError(err => of(api_actions.apiError({msg: err})))
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
                catchError(err => of(api_actions.apiError({msg: err})))
            )),
        )
    );

    loadBookings$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.fetchBookings),
            take(1),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap(() => this.dataService.getBookings().pipe(
                map((res: Booking[]) => api_actions.fetchBookingsSuccess({data: res})),
                catchError(err => of(api_actions.apiError({msg: err.error.error})))
            )),
        )
    );

    saveStop$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.saveStop),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap((action) => this.dataService.saveStop(action.code).pipe(
                map((res) => api_actions.saveStopSuccess({code: action.code, msg: res.msg})),
                catchError(err => of(api_actions.apiError({msg: err})))
            ))      
        )     
    );

    deleteStop$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.deleteStop),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap((action) => this.dataService.deleteStop(action.code).pipe(
                map((res) => api_actions.deleteStopSuccess({code: action.code, msg: res.msg})),
                catchError(err => of(api_actions.apiError({msg: err})))
            ))      
        )     
    );

    deleteRoute$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.deleteRoute),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap((action) => this.dataService.deleteRoute(action.code).pipe(
                map((res) => api_actions.deleteRouteSuccess({code: action.code, msg: res.msg})),
                catchError(err => of(api_actions.apiError({msg: err})))
            ))      
        )     
    );

    saveRoute$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.saveRoute), 
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap((action) => this.dataService.saveRoute(action.code).pipe(
                map((res) => api_actions.saveRouteSuccess({code: action.code, msg: res.msg})),
                catchError(err => of(api_actions.apiError({msg: err})))
            ))      
        )     
    );

    loadSavedInfo$ = createEffect(()=>
        this.actions$.pipe(
            ofType(api_actions.getSavedInfo), 
            take(1),
            tap(() => this.store.dispatch(api_actions.showSpinner())),
            switchMap(() => this.dataService.getSavedInfo().pipe(
                map(res => api_actions.getSavedInfoSuccess(res)),
                catchError(err => of(api_actions.getSavedInfoError({msg: err})))
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

    sendMessage$ = createEffect(()=>
        this.actions$.pipe(
            ofType(
                api_actions.saveStopSuccess,
                api_actions.deleteStopSuccess,
                api_actions.deleteRouteSuccess,
                api_actions.saveRouteSuccess
            ), 
            tap((action) => this.msg.apiMsg.next(action.msg))
        ), {dispatch: false}  
    );


}
