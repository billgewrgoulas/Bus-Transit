
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs";
import * as navigation from'../actions/navigation.actions';
import * as api_actions from "../actions/api-calls.actions";
import * as select_actions from '../actions/select.actions';
import { AppState } from "../reducers/api-reducer";
import { ROUTER_NAVIGATED, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { getNavigationRoute, getUrl } from "../selectors/router.reducer";
import { currentLine } from "../selectors/appState.selectors";
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

    fetchLineData$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(getNavigationRoute)),
            filter(([action, router]) => router.routeConfig.path === ':lineCode'),
            map(([action, router]) => router.params.lineCode),
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
            withLatestFrom(this.store.select(getNavigationRoute)),
            filter(([action, router]) => router.routeConfig.path === ':lineCode/route/:routeCode'),
            map(([action, router]) => router.params.routeCode),
            switchMap((routeCode) => [
                api_actions.getRouteDetails({code: routeCode}),
                select_actions.selectRoute({code: routeCode}),
            ])
        ),
    );

    clearLine$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            withLatestFrom(this.store.select(getNavigationRoute)),
            filter(([action, router]) => router.routeConfig.path === ''),
            switchMap(() => [
                select_actions.selectLine({id: ''}),
                select_actions.selectRoute({code: ''}),
                select_actions.selectStop({code: ''}),
            ])
        )
    );

    previousView$ = createEffect(()=>
        this.actions$.pipe(
            ofType(navigation.nav_actions.arrowNavigation),
            withLatestFrom(this.store.select(getUrl), this.store.select(currentLine)),
            tap(([action, url, line]) =>{

                if(url.includes('/route')){
                    this.router.navigate([{ outlets: { sidebar: [ 'lines', line?.id] }}]);
                }else if(url.includes('/(sidebar:lines/')){
                    this.router.navigate([{ outlets: { sidebar: [ 'lines'] }}]);
                }else{
                    this.router.navigate(['']);
                }

            })),
            {dispatch: false}
    );

}
