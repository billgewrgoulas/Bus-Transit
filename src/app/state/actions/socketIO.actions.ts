import { createAction, props } from "@ngrx/store";
import { IRouteVeh } from "../entities/bus.entity";

export module SocketActions{

    /* Start route bus location updates */
    export const updateBusLocations = createAction('[IO] Bus Location Updates');
    export const busLocationsUpdates = createAction('[IO] Bus Locations Updated', props<{data: IRouteVeh}>());
    export const stopBusLocationUpdates = createAction('[IO] Bus Location Cancel');
}