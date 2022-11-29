import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs";
import * as navigation from'../Actions/navigation.actions';
import * as api_actions from "../Actions/api-calls.actions";
import * as select_actions from "../Actions/select.actions";
import { AppState } from "../Reducers/api-reducer";
import { ROUTER_NAVIGATED } from "@ngrx/router-store";
import { getState } from "../Selectors/router.selectors";
import { Router } from "@angular/router";
import { Location } from '@angular/common'
import { getAllStops } from "../Selectors/appState.selectors";

@Injectable()
export class RouterEffects{

    constructor(
        private location: Location, 
        private actions$: Actions, 
        private store: Store<AppState>, 
    ){}

    fetchLines$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'lines_load'),
            map((event) => api_actions.getLines())
        )
    );

    fetchStops$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState), this.store.select(getAllStops)),
            filter(([action, {url}, stops]) => url.includes('sidebar:routes') && stops.length == 0),
            map(() => api_actions.getStops())
        )
    );

    fetchLineData$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'line_data'),
            map(([action, {params}]) => params!['lineCode']),
            switchMap((lineCode: string) => [
                select_actions.selectLine({id: lineCode}),
                api_actions.getLineRoutes({id: lineCode}),
                select_actions.selectRoute({code: ''}),
                select_actions.selectStop({code: ''}),
            ]), 
        ),
    );

    fetchRouteDetails$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'route_data'),
            map(([action, {params}]) => params!['routeCode']),
            switchMap((routeCode) => [
                api_actions.getRouteDetails({code: routeCode}),
                select_actions.selectRoute({code: routeCode}),
            ])
        ),
    );

    selectItinerary$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'trip_details'),
            map(([action, {params}]) => params!['index']),
            switchMap((index) => [
                select_actions.selectItinerary({index: index}),
            ])
        ),
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

    clearPlan$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, {query}]) => query!['module'] == 'trip_options'),
            switchMap(action => [select_actions.emptyPlan()])
        )
    );

    previousView$ = createEffect(()=>
        this.actions$.pipe(
            ofType(navigation.arrowNavigation),
            tap(() => this.location.back())
        ), {dispatch: false}
    );

}
