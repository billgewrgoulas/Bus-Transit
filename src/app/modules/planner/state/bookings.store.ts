import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Booking } from "src/app/state/Entities/booking.entity";
import { HttpErrorResponse } from "@angular/common/http";
import { filter, throttleTime, switchMap, Observable, map, Subject, tap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { AppState } from "src/app/state/Reducers/api-reducer";
import { Store } from "@ngrx/store";
import * as api_actions from "src/app/state/Actions/api-calls.actions";
import { Router } from "@angular/router";
import { newBooking, selectBooking } from "src/app/state/Selectors/appState.selectors";

export interface BookInfo{
    user: string;
    it: number;
};

export interface BookingState{
    delete_id: number;
    toaster: Subject<string>,
    info: BookInfo | undefined
    book: boolean
};

export const initialBookingState: BookingState = {
    delete_id: -1,
    toaster: new Subject<string>(),
    info: undefined,
    book: false
};
  
@Injectable()
export class BookingsStore extends ComponentStore<BookingState> {
    
    constructor(private data: DataService, private store: Store<AppState>, private router: Router) {
        super(initialBookingState);
    }

    public deleteComplete = this.updater((state: BookingState, msg: string): BookingState => {
        state.toaster.next(msg);
        return {...state, delete_id: -1};
    });

    public changeDelete = this.updater((state: BookingState, trip_id: number): BookingState => {
        return {...state, delete_id: trip_id};
    });

    public initBooking = this.updater((state: BookingState, info: BookInfo): BookingState => {
        return {...state, info: {...info}, book: true};
    });

    public bookingCompleted = this.updater((state: BookingState, msg: string): BookingState => {
        state.toaster.next(msg);
        return {...state, book: false};
    });

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

    public deleteBooking = this.effect(() => {
        return this.state$.pipe(
            filter(state => state.delete_id != -1),
            switchMap(state => this.store.select(selectBooking(state.delete_id))),
            filter(booking => !!booking),
            switchMap((booking) => this.data.deleteBooking(booking!).pipe(
                tapResponse(
                    (res: any) => {
                        this.deleteComplete('booking canceled');
                        this.store.dispatch(api_actions.deleteBooking({trip_id: booking!.trip_id}))
                    }, 
                    (error: HttpErrorResponse) => {
                        this.deleteComplete(error.error);
                    }
                )
            )),
        );
    });

}