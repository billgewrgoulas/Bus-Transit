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

export interface TripState {
    start: string[];
    destination: string[];
    options: string[];
    direction: string;
}

export const initialState: TripState = {
    start: [],
    destination: [],
    direction: '',
    options: []
}
  
@Injectable()
export class DirectionsStore extends ComponentStore<TripState> {
    
    public constructor(private router: Router, private store: Store<AppState>, private data: DataService) {
        super(initialState);
    }
    
    public swapPoints = this.updater((state: TripState): TripState =>{
        return {...state, direction: 'swap',  start: state.destination, destination: state.start};
    });

    public changeDirection = this.updater((state: TripState, direction: string): TripState =>{
        return {...state, direction: direction};
    });

    public updatePoint = this.updater((state: TripState, point: string[]): TripState => {
        if(state.direction === 'start'){
            return {...state, start: point, options: []};
        }else{
            return {...state, destination: point, options: []};
        }
    });

    public addOption = this.updater((state: TripState, option: string): TripState => {
        return {...state, options: [...state.options, option]};
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

    public fetchPaths = this.effect(() => {
        return this.state$.pipe(
            tap(data => this.emptyRoutes(data)),
            filter(data => data.destination.length > 0 && data.start.length > 0),
            debounceTime(500),
            map((data: TripState) => this.store.dispatch(api_actions.getFilteredRoutes({data: data}))),
        );
    });

    private emptyRoutes(data: TripState){
        if(data.destination.length == 0 || data.start.length == 0){
            this.store.dispatch(emptyRoutes());
        }
    }

}