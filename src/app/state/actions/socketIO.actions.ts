import { createAction, props } from "@ngrx/store";

export module SocketActions{

    /* Start route bus location updates */
    export const updateBusLocations = createAction('[IO] Bus Location Updates');
    export const stopBusLocationUpdates = createAction('[IO] Bus Location Cancel');
}