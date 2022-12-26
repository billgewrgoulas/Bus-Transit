import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Booking } from "src/app/state/Entities/booking.entity";
import { HttpErrorResponse } from "@angular/common/http";
import { filter, throttleTime, switchMap, Observable, map, Subject } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { AppState } from "src/app/state/Reducers/api-reducer";
import { Store } from "@ngrx/store";
import * as api_actions from "src/app/state/Actions/api-calls.actions";
import { Router } from "@angular/router";
import { newBooking } from "src/app/state/Selectors/appState.selectors";

export interface BookInfo{
    user: string;
    it: number;
};

export interface BookingState{
    bookings: Booking[];
    fetch: boolean;
    selected_index: number;
    delete_index: number;
    toaster: Subject<string>,
    info: BookInfo | undefined
    book: boolean
};

export const initialBookingState: BookingState = {
    bookings: [],
    fetch: false,
    selected_index: -1,
    delete_index: -1,
    toaster: new Subject<string>(),
    info: undefined,
    book: false
};
  
@Injectable()
export class BookingsStore extends ComponentStore<BookingState> {
    
    constructor(private data: DataService, private store: Store<AppState>, private router: Router) {
        super(initialBookingState);
    }

    public updateBookings = this.updater((state: BookingState, bookings: Booking[] | void): BookingState => {
        if(bookings){
            return {...state, bookings: bookings, fetch: false};
        }
        return initialBookingState;
    });

    public errorMsg = this.updater((state: BookingState, msg: string): BookingState => {
        state.toaster.next(msg);
        return {...state, delete_index: -1, fetch: false};
    });

    public delete = this.updater((state: BookingState): BookingState => {
        state.toaster.next('booking canceled');
        return {...state, delete_index: -1, bookings: state.bookings.filter((b, index) => index != state.delete_index)};
    });

    public changeSelcted = this.updater((state: BookingState, booking: Booking): BookingState => {
        return {...state, selected_index: state.bookings.findIndex(b => b.trip_id == booking.trip_id)};
    });

    public changeDelete = this.updater((state: BookingState, index: number): BookingState => {
        return {...state, delete_index: index};
    });

    public initFetch = this.updater((state: BookingState): BookingState => {
        return {...state, fetch: true};
    });

    public initBooking = this.updater((state: BookingState, info: BookInfo): BookingState => {
        return {...state, info: {...info}, book: true};
    });

    public bookingCompleted = this.updater((state: BookingState, msg: string): BookingState => {
        state.toaster.next(msg);
        return {...state, book: false};
    });

    public getBookings(): Observable<Booking[]>{
        return this.select(this.state$, (state) => state.bookings);
    }

    public filter(value: string): Observable<Booking[]>{
        return this.select(this.getBookings(), (bookings) => {
            return bookings.filter(booking => 
                booking.route.includes(value) || 
                booking.travel.includes(value) || 
                booking.start.includes(value) || 
                booking.end.includes(value)
            );
        });
    }

    public dispatchBooking = this.effect(() => {
        return this.state$.pipe(
            filter(state => state.book && !!state.info),
            switchMap(({info}) => this.store.select(newBooking(info!.user, info!.it)).pipe(
                switchMap((bookings) => this.data.book(bookings)),
                tapResponse(
                    (res: any) => this.bookingCompleted('booking success'), 
                    (error: HttpErrorResponse) => this.bookingCompleted(error.error.error)
                )
            ))
        );
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

    public deleteBooking = this.effect(() => {
        return this.state$.pipe(
            filter(state => state.delete_index != -1),
            map(state => state.bookings[state.delete_index]),
            switchMap((booking) => this.data.deleteBooking(booking)),
            tapResponse(
                (res: any) => this.delete(), 
                (error: HttpErrorResponse) => this.errorMsg(error.error)
            )
        );
    });

    public fetchPlan = this.effect(() => {
        return this.state$.pipe(
            filter(state => state.selected_index != -1),
            throttleTime(1000),
            map(state => state.bookings[state.selected_index]),
            map((state) => this.store.dispatch(api_actions.getItinerary({data: state}))),
            tapResponse(
                (action) => {
                    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trips', 0] }}], 
                        {queryParams: {module: 'trip_details'}
                    });
                },(err) => {
                    console.log(err);
                }
            )
        );
    });

}