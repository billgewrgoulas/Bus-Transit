import { createAction, props } from "@ngrx/store";
import { IArrival } from "../entities/arival.entity";
import { IRouteVeh } from "../entities/bus.entity";
import { ILine } from "../entities/line.entity";
import { IRoute } from "../entities/route.entity";
import { ISchedule } from "../entities/schedule.entity";

export module requests{

    /* Fetch all lines based on station name, bus... */
    export const getRoutes = createAction('[API] GET Routes');
    export const getRoutesSuccess = createAction('[API] Routes Loaded Success', props<{data: ILine[]}>());
    export const getRoutesError = createAction('[API] Routes Loaded Failed');

    /* Fetch the routes of a line based on the lineCode */
    export const getLineRoutes = createAction('[API] GET Details', props<{lineCode: string}>());
    export const getLineRoutesSuccess = createAction('[API] Routes Details Success', props<{data: any}>());
    export const getLineRoutesError = createAction('[API] Details Loaded Failed');

    /* Fetch route geopoints with stops */
    export const getRouteDetails = createAction('[API] Get Route Details', props<{routeCode: string}>());
    export const getRouteDetailsuccess = createAction('[API] Loaded Success', props<{data: any, code: string}>());
    export const getRouteDetailsError = createAction('[API] Details load error');

    /* Fetch line come and go schedule */
    export const getSchedule = createAction('[API] Get sched', props<{sdc_code: string}>());
    export const getSchedSuccess = createAction('[API] Get sched success', props<{data: ISchedule}>());
    export const getSchedError = createAction('[API] Get sched error');
    
    /* Fetch arrivals of a specific stop + live update actions */
    export const getStationsArrivals = createAction('[API] GET Arrivals', props<{stopCode: string}>());
    export const getStationsArrivalsSuccess = createAction('[API] GET Arrivals Success', props<{data: IArrival[]}>());
    export const getStationsArrivalsError = createAction('[Api] GET Arrivals error');
    export const updateArrivals = createAction('[API] update arrivals');
    export const stopUpdates = createAction('[API] Stop arrival updates');

    /* Line, station, bus and route changed */
    export const selectLine = createAction('Select Line', props<{code: string}>());
    export const selectRoute = createAction('Select Route', props<{routeCode: string}>());
    export const selectStation = createAction('Select Station', props<{stopCode: string}>());
    export const selectBus = createAction('Select Bus', props<{busCode: string}>());
    export const setCurrentSched = createAction('Select schedule', props<{id: string}>());

    /* Start route bus location updates */
    export const updateBusLocations = createAction('[IO] Bus Location Updates', props<{routeCode: string}>());
    export const busLocationsFetched = createAction('[IO] Bus Locations Updated', props<{data: IRouteVeh}>());
    export const stopBusLocationUpdates = createAction('[IO] Bus Location Cancel');

    /* Book/Unbook the current stop of the current route */
    export const bookStop = createAction('Book stop');
    export const unbookStop = createAction('Unbook stop');

}

