import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, switchMap, take, tap, withLatestFrom } from "rxjs";
import * as navigation from'../Actions/navigation.actions';
import * as api_actions from "../Actions/api-calls.actions";
import * as select_actions from "../Actions/select.actions";
import { AppState } from "../Reducers/api-reducer";
import { ROUTER_NAVIGATED } from "@ngrx/router-store";
import { getState } from "../Selectors/router.selectors";
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Injectable()
export class RouterEffects{

    constructor(
        private location: Location, 
        private router: Router,
        private actions$: Actions, 
        private store: Store<AppState>, 
    ){}

    linesModule$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {url, params}]) => url.startsWith('/(sidebar:lines') && !!params),
            map(([action, {params}]) => navigation.linesModule({params: params}))
        )
    );

    fetchRoutesAndStops$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            map(() => api_actions.getStopAndRoutes())
        )
    );

    fetchLines$ = createEffect(()=>
        this.actions$.pipe(
            ofType(navigation.linesModule),
            map((event) => api_actions.getLines())
        )
    );

    fetchLineRoutes$ = createEffect(()=>
        this.actions$.pipe(
            ofType(navigation.linesModule),
            filter(({params}) => params!['lineCode']),
            switchMap(({params}) => [
                select_actions.selectLine({id: params!['lineCode']}),
                select_actions.selectRoute({code: ''}),
                select_actions.selectStop({code: ''}),
            ]), 
        )
    );

    fetchRouteDetails$ = createEffect(()=>
        this.actions$.pipe(
            ofType(navigation.linesModule),
            filter(({params}) => params!['routeCode']),
            switchMap(({params}) => [
                api_actions.getRouteDetails({code: params!['routeCode']}),
                select_actions.selectRoute({code: params!['routeCode']}),
            ])
        )
    );

    clearLine$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'lines_load'),
            switchMap(() => [
                select_actions.selectLine({id: ''}),
                select_actions.selectRoute({code: ''}),
                select_actions.selectStop({code: ''}),
            ])
        )
    );

    clearStop$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'stops_module'),
            map(() => select_actions.selectStop({code: ''}))
        )
    );

    fetchStopRoutes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {url, params}]) => url.startsWith('/(sidebar:stops') && params!['stopCode']),
            switchMap(([action, {params}]) => [
                select_actions.selectStop({code: params!['stopCode']}),
                api_actions.stopRoutes({stopCode: params!['stopCode']})
            ])  
        )
    );

    selectItinerary$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'trip_details'),
            map(([action, {params}]) => params!['index']),
            map((index) => select_actions.selectItinerary({index: index}))
        )
    );

    getBookings$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {url}]) => url.startsWith('/(sidebar:routes/bookings)')),
            switchMap(() => [
                api_actions.fetchBookings(),
                select_actions.selectStop({code: ''})
            ])
        )
    );

    bookingData$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'qr_module' || query!['module'] == 'booking_origin'),
            switchMap(([action, {params}]) => [
                select_actions.selectBooking({trip_id: params!['id']}),
                api_actions.fetchBookings()
            ]),   
        )
    );

    bookingOrigin$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED), 
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'booking_origin'),
            map(([action, {params}]) => select_actions.selectStop({code: params!['code']}))
        )
    );

    savedInfo$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'saved_info'),
            map(() => select_actions.selectStop({code: ''})),   
        )
    );

    loadSavedInfo$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED), 
            map(() => api_actions.getSavedInfo())
        )
    );

    clearPlan$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'trip_options'),
            map(action => select_actions.emptyPlan())
        )
    );

    placesMap$ = createEffect(() => 
        this.actions$.pipe(
            ofType(navigation.placesMap),
            withLatestFrom(this.store.select(getState)),
            tap(([action, {url}]) => {

                const link: string[] = [ 'routes', 'places', 'start', 'map'];
                if(url.includes('dest')){
                    link[2] = 'dest';
                }

                this.router.navigate([{ outlets: { sidebar: link }}]);
            }),
            
        ), {dispatch: false}
    );

    changeModule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            map(([action, {url}]) => {
                if(url.startsWith('/(sidebar:stops')){
                    return 'stops'
                }else if(url.startsWith('/(sidebar:lines')){
                    return 'lines'
                }else if(url.startsWith('/(sidebar:routes')){
                    return 'planner';
                }else{
                    return '';
                }
            }),
            map((module) => select_actions.module({module: module}))
        )
    );

    previousView$ = createEffect(()=>
        this.actions$.pipe(
            ofType(navigation.arrowNavigation),
            withLatestFrom(this.store.select(getState)),
            tap(([action, {query}]) => {
                if(query!['module'] == 'stop_data'){
                    this.navigate(['stops', 'stops_module']);
                    this.location.replaceState('');
                }else{
                    this.location.back();
                }
            })
        ), {dispatch: false}
    );

    private navigate(link: string[]){
        this.router.navigate([{ outlets: { sidebar: link[0] }}], {queryParams: {module: link[1]}});
    }

}
