import { createAction, props } from "@ngrx/store";
import { IRouteVeh } from "../entities/bus.entity";

export module SocketActions{

    /* Start stop arrivals updates */
    export const updateArrivals = createAction('[IO] update arrivals');
    export const stopUpdates = createAction('[IO] Stop arrival updates');

    /* Start route bus location updates */
    export const updateBusLocations = createAction('[IO] Bus Location Updates');
    export const busLocationsUpdates = createAction('[IO] Bus Locations Updated', props<{data: IRouteVeh}>());
    export const stopBusLocationUpdates = createAction('[IO] Bus Location Cancel');
}