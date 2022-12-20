import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Booking } from "src/app/state/Entities/booking.entity";
import { HttpErrorResponse } from "@angular/common/http";
import { filter, throttleTime, switchMap, Observable, map, tap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { AppState } from "src/app/state/Reducers/api-reducer";
import { Store } from "@ngrx/store";
import * as api_actions from "src/app/state/Actions/api-calls.actions";
import { TripState } from "./directions.store";
import { Router } from "@angular/router";


export interface BookingState{
    bookings: Booking[];
    fetch: boolean;
    selected: number;
};

export const initialBookingState: BookingState = {
    bookings: [],
    fetch: false,
    selected: -1
};
  
@Injectable()
export class BookingsStore extends ComponentStore<BookingState> {
    
    constructor(
        private data: DataService, 
        private store: Store<AppState>, 
        private router: Router
    ) {
        super(initialBookingState);
    }

    public updateBookings = this.updater((state: BookingState, bookings: Booking[] | void): BookingState => {

        if(bookings){
            return {...state, bookings: bookings, fetch: false};
        }
        
        return initialBookingState;
    });

    public initFetch = this.updater((state: BookingState): BookingState => {
        return {...state, fetch: true};
    });

    public getBookings(): Observable<Booking[]>{
        return this.select(this.state$, (state) => state.bookings);
    }

    public resetIndex = this.updater((state: BookingState, index: number): BookingState => {
        return {...state, selected: index};
    });

    public fetchBookings = this.effect(() => {
        return this.state$.pipe(
            filter(state => state.fetch),
            switchMap((state) => this.data.getBookings()),
            tapResponse(
                (bookings) => this.updateBookings(bookings), 
                (error: HttpErrorResponse) => this.updateBookings([])
            )
        );
    });

    public fetchPlan = this.effect(() => {
        return this.state$.pipe(
            filter(state => state.selected != -1),
            throttleTime(1000),
            map(state => state.bookings[state.selected]),
            map(booking => this.tripState(booking)),
            map((state) => this.store.dispatch(api_actions.fetchPlan({data: state}))),
            switchMap(s => this.state$),
            tapResponse(
                (action) => {
                    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trips', action.bookings[action.selected].it] }}], 
                        {queryParams: {module: 'trip_details'}
                    });
                },(err) => {
                    this.resetIndex(-1);
                    console.log(err);
                }
            )
        );
    });

    private tripState(b: Booking): TripState{
        return {
            start: [b.start, b.startStop].concat(b.fromPlace.split(",")),
            destination: [b.end, b.endStop].concat(b.toPlace.split(",")),
            time: b.travel.split(", ")[0],
            date: new Date(b.travel.split(", ")[1]),
            arriveBy: b.arriveBy,
            fetch: false,
            direction: ''
        };
    }

}