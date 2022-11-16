import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { debounceTime, filter, map, Observable, of, switchMap, tap } from "rxjs";
import { TripData } from "../Entities/map.data.entity";
import * as api_actions from "../Actions/api-calls.actions";
import { AppState } from "../Reducers/api-reducer";
import { Router } from "@angular/router";

export interface TripState {
    start: string[];
    destination: string[];
    options: string[];
    direction: string;
}

export const initialState: TripState = {
    start: [],
    destination: [],
    direction: 'start',
    options: []
}
  
@Injectable()
export class DirectionsStore extends ComponentStore<TripState> {
    
    public constructor(private router: Router, private store: Store<AppState>) {
        super(initialState);
    }
    
    /* STATE UPDATERS */
    public updatePoint = this.updater((state: TripState, point: string[]): TripState => {
        if(state.direction === 'start') return {...state, start: point};
        return {...state, destination: point};
    });

    public swapPoints = this.updater((state: TripState): TripState =>{
        return {...state, start: state.destination, destination: state.start};
    });

    public changeDirection = this.updater((state: TripState, direction: string): TripState =>{
        return {...state, direction: direction};
    });

    public getNames(): Observable<any>{
        return this.select(state => {
            const names = {start: '', end: ''};
            if(state.start.length > 0) names.start = state.start[1];
            if(state.destination.length > 0) names.end = state.destination[1];
            return names;
        });
    }

}