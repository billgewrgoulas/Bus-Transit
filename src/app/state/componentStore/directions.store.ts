import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { Observable, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { IRoute } from "../entities/route.entity";
import { IStop } from "../entities/stop.entity";
import { AppState } from "../reducers/api-reducer";
import { filterStops } from "../selectors/appState.selectors";


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
    
    public constructor() {
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