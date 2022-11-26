import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { debounceTime, filter, map, Observable, of, switchMap, tap } from "rxjs";
import { TripData } from "../Entities/map.data.entity";
import * as api_actions from "../Actions/api-calls.actions";
import { AppState } from "../Reducers/api-reducer";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { IRoute } from "../Entities/route.entity";
import { emptyRoutes } from "../Actions/select.actions";
import { state } from "@angular/animations";
import { FormControl } from "@angular/forms";

export interface TripState {
    start: string[];
    destination: string[];
    options: string[];
    direction: string;
    time: string;
    date: string;
    arriveBy: string;
    sortBy: string;
    mode: string;
    strategy: string;
    fetch: boolean;
}

export const initialState: TripState = {
    start: [],
    destination: [],
    options: [],
    direction: '',
    time: '',
    date: '',
    arriveBy: 'depart',
    sortBy: 'travel_time',
    mode: 'TRANSIT,WALK',
    strategy: '',
    fetch: false,
}
  
@Injectable()
export class DirectionsStore extends ComponentStore<TripState> {
    
    public constructor(private router: Router, private store: Store<AppState>, private data: DataService) {
        super(initialState);
    }

    public fetchComplete = this.updater((state: TripState): TripState =>{
        return {...state, fetch: false};
    });

    public swapPoints = this.updater((state: TripState): TripState =>{
        return {...state, direction: 'swap',  start: state.destination, destination: state.start};
    });

    public changeDirection = this.updater((state: TripState, direction: string): TripState =>{
        return {...state, direction: direction};
    });

    public updateStrategy = this.updater((state: TripState, strategy: string): TripState => {
        return {...state, strategy: strategy};
    });

    public updatePoint = this.updater((state: TripState, point: string[]): TripState => {
        if(state.direction === 'start'){
            return {...state, start: point};
        }else{
            return {...state, destination: point};
        }
    });

    public addOption = this.updater((state: TripState, option: string): TripState => {
        return {...state, options: [...state.options, option]};
    });

    public updateTime = this.updater((state: TripState, time: string): TripState => {
       return {...state, time: time};
    });

    public updateArriveBy = this.updater((state: TripState, arriveBy: string): TripState => {
        return {...state, arriveBy: arriveBy};
    });

    public updateMode = this.updater((state: TripState, mode: string): TripState => {
        return {...state, mode: mode};
    });

    public updateSortBy = this.updater((state: TripState, sortBy: string): TripState => {
        return {...state, sortBy: sortBy};
    });

    public updateDate = this.updater((state: TripState, date: string | undefined): TripState => {

        if(date){
            return {...state, date: date};
        }else{
            return state;
        }
        
    });

    public initFetch = this.updater((state: TripState): TripState =>{
        if(state.start.length == 0 || state.destination.length == 0){
            return state;
        }else{
            return {...state, fetch: true};
        }
    });

    /* STATE SELECTORS */
    public getNames(): Observable<any>{
        return this.select(state => {
            const names = {start: '', end: ''};
            if(state.start.length > 0) names.start = state.start[1];
            if(state.destination.length > 0) names.end = state.destination[1];
            return names;
        });
    }

    // public fetchPaths = this.effect(() => {
    //     return this.state$.pipe(
    //         tap(data => this.emptyRoutes(data)),
    //         filter(data => data.destination.length > 0 && data.start.length > 0),
    //         debounceTime(500),
    //         map((data: TripState) => this.store.dispatch(api_actions.getFilteredRoutes({data: data}))),
    //     );
    // });

    public fetchPlan = this.effect(() => {
        return this.state$.pipe(
            filter(state => state.fetch),
            debounceTime(500),
            map((data: TripState) => this.store.dispatch(api_actions.fetchPlan({data: data}))),
            tapResponse(
                (action) => {
                    this.fetchComplete();
                    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trips'] }}], {queryParams: {module: 'trips'}});
                }, 
                (error: HttpErrorResponse) => {
                    this.fetchComplete() //fetch will be completed even if it fails 
                }
            )
        );
    });

}