import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface Booking{
    trip_id: number;
    user_id: string;
    startStop: string;
    endStop: string;
    start: string;
    end: string;
    route: string;
    travel: string;
    arrive: string;
    date: string;
    slug: string;
}

export interface BookingState extends EntityState<Booking>{
    activeBooking: number,
};

export const bookingStateAdapter: EntityAdapter<Booking> = createEntityAdapter<Booking>({
    selectId: (booking: Booking)=> booking.trip_id
});

export const initialBookingState: BookingState = bookingStateAdapter.getInitialState({
    activeBooking: -1,
});