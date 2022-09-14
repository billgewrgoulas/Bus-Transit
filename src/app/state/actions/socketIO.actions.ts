import { createAction, props } from "@ngrx/store";

export module SocketActions{

    /* Start stop arrivals updates */
    export const updateArrivals = createAction('[IO] update arrivals');
    export const stopUpdates = createAction('[IO] Stop arrival updates');

    /* Start route busses location updates */
    export const updateBusLocations = createAction('[IO] Bus Location Updates', props<{routeCode: string}>());
    export const stopBusLocationUpdates = createAction('[IO] Bus Location Cancel');
}