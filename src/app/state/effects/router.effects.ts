import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs";
import * as navigation from'../Actions/navigation.actions';
import * as api_actions from "../Actions/api-calls.actions";
import * as select_actions from "../Actions/select.actions";
import { AppState } from "../Reducers/api-reducer";
import { ROUTER_NAVIGATED, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { getState } from "../Selectors/router.selectors";
import { Location } from '@angular/common'
import { state } from "@angular/animations";
import { url } from "inspector";

@Injectable()
export class RouterEffects{

    constructor(
        private location: Location, 
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
                api_actions.getLineRoutes({id: params!['lineCode']}),
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
                //select_actions.emptyRoutes()
            ])
        )
    );

    fetchStops$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {url}]) => url.includes('sidebar:routes') || url.includes('sidebar:stops')),
            map(() => api_actions.getStops())
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
                api_actions.stopRoutes({stopCode: params!['stopCode']}),
                select_actions.selectStop({code: params!['stopCode']})
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

    clearPlan$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'trip_options'),
            map(action => select_actions.emptyPlan())
        )
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
            tap((url) => this.location.back())
        ), {dispatch: false}
    );

}
