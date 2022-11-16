import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs";
import * as navigation from'../Actions/navigation.actions';
import * as api_actions from "../Actions/api-calls.actions";
import * as select_actions from "../Actions/select.actions";
import { AppState } from "../Reducers/api-reducer";
import { ROUTER_NAVIGATED } from "@ngrx/router-store";
import { getParams, getState, selectUrl } from "../Selectors/router.selectors";
import { currentLine } from "../Selectors/appState.selectors";
import { Router } from "@angular/router";

@Injectable()
export class RouterEffects{

    constructor(private actions$: Actions, private store: Store<AppState>, private router: Router){}

    fetchLines$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            map((event) => api_actions.getLines())
        )
    );

    fetchStops$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, state]) => state.query!['module'] === 'stop_load'),
            map(() => api_actions.getStops())
        )
    );

    fetchLineData$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, state]) => state.query!['module'] === 'line_click'),
            map(([action, state]) => state.params!['lineCode']),
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
            filter(([action, state]) => state.query!['module'] === 'route_click'),
            map(([action, state]) => state.params!['routeCode']),
            switchMap((routeCode) => [
                api_actions.getRouteDetails({code: routeCode}),
                select_actions.selectRoute({code: routeCode}),
            ])
        ),
    );

    clearLine$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getState)),
            filter(([action, state]) => state.query!['module'] === 'lines_load'),
            switchMap(() => [
                select_actions.selectLine({id: ''}),
                select_actions.selectRoute({code: ''}),
                select_actions.selectStop({code: ''}),
                //select_actions.emptyRoutes()
            ])
        )
    );

    previousView$ = createEffect(()=>
        this.actions$.pipe(
            ofType(navigation.arrowNavigation),
            withLatestFrom(this.store.select(getState)),
            tap(([action, state]) => {

                const {query, url, params} = state;

                if(query!['module'] === 'route_click'){
                    this.router.navigate([{ outlets: { sidebar: [ 'lines', params!['lineCode']] }}], {queryParams: {module: 'line_click'}});
                }else if(query!['module'] === 'line_click'){
                    this.router.navigate([{ outlets: { sidebar: [ 'lines'] }}]);
                }else if(url === '/(sidebar:routes)'){
                    this.router.navigate(['']);
                }else if(url === '/(sidebar:routes/places)'){
                    this.router.navigate([{ outlets: { sidebar: [ 'routes'] }}]);
                }else{
                    this.router.navigate(['']);
                }

            })),
            {dispatch: false}
    );

}
