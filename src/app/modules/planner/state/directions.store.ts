import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { filter, map, Observable, throttleTime } from "rxjs";
import * as api_actions from "../../../state/Actions/api-calls.actions";
import { AppState } from "../../../state/Reducers/api-reducer";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

const now = () => new Date().getHours() + ':' + new Date().getMinutes();

export interface TripState {
    start: string[];
    destination: string[];
    direction: string;
    time: string;
    date: Date;
    arriveBy: string;
    fetch: boolean;
}

export const initialState: TripState = {
    start: [],
    destination: [],
    direction: '',
    time: now(),
    date: new Date(),
    arriveBy: 'depart',
    fetch: false,
}
  
@Injectable()
export class DirectionsStore extends ComponentStore<TripState> {
    
    public constructor(private router: Router, private store: Store<AppState>) {
        super(initialState);
    }

    public reset = this.updater((state: TripState) => {
        return initialState;
    });

    public fetchComplete = this.updater((state: TripState): TripState =>{
        return {...state, fetch: false};
    });

    public swapPoints = this.updater((state: TripState): TripState =>{
        return {...state, direction: 'swap',  start: [...state.destination], destination: [...state.start], fetch: true};
    });

    public changeDirection = this.updater((state: TripState, direction: string): TripState =>{
        return {...state, direction: direction};
    });

    public updatePoint = this.updater((state: TripState, point: string[]): TripState => {
        if(state.direction === 'start'){
            return {...state, start: point};
        }else if (state.direction === 'dest'){
            return {...state, destination: point};
        }

        return initialState;
    });

    public updateStart = this.updater((state: TripState, point: string[]): TripState => {
        return {...state, start: point};
    });

    public updateEnd = this.updater((state: TripState, point: string[]): TripState => {
        return {...state, destination: point};
    });

    public updateTime = this.updater((state: TripState, time: string): TripState => {
       return {...state, time: time};
    });

    public updateArriveBy = this.updater((state: TripState, arriveBy: string): TripState => {
        return {...state, arriveBy: arriveBy};
    });

    public updateDate = this.updater((state: TripState, date: Date | undefined): TripState => {

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

    public fetchPlan = this.effect(() => {
        return this.state$.pipe(
            filter(state => state.fetch && state.start.length > 0 && state.destination.length > 0),
            throttleTime(500),
            map((data: TripState) => this.store.dispatch(api_actions.fetchPlan({data: data}))),
            tapResponse(
                (action) => {
                    this.fetchComplete();
                    this.changeDirection('');
                }, 
                (error: HttpErrorResponse) => {
                    console.log(error);
                    this.changeDirection('');
                    this.fetchComplete(); //fetch will be completed even if it fails 
                }
            )
        );
    });

}