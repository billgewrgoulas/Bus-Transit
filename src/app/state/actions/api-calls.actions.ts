import { createAction, props } from "@ngrx/store";
import { IArrival } from "../entities/arival.entity";
import { ILine } from "../entities/line.entity";
import { IRoute } from "../entities/route.entity";


export module requests{

    /* Fetch all lines based on station name, bus... */
    export const getRoutes = createAction('[API] GET Routes');
    export const getRoutesSuccess = createAction('[API] Routes Loaded Success', props<{data: ILine[]}>());
    export const getRoutesError = createAction('[API] Routes Loaded Failed');

    /* Fetch the routes of a line based on the lineCode */
    export const getLineRoutes = createAction('[API] GET Details', props<{lineCode: string}>());
    export const getLineRoutesSuccess = createAction('[API] Routes Details Success', props<{data: IRoute[], lineCode: string}>());
    export const getLineRoutesError = createAction('[API] Details Loaded Failed');

    /* Fetch route geopoints with stops */
    export const getRouteDetails = createAction('[API] Get Route Details', props<{routeCode: string}>());
    export const getRouteDetailsuccess = createAction('[API] Loaded Success', props<{data: any, code: string}>());
    export const getRouteDetailsError = createAction('[API] Details load error');

     /* Fetch arrivals of a specific stop */
     export const getStationsArrivals = createAction('[API] GET Arrivals', props<{stopCode: string}>());
     export const getStationsArrivalsSuccess = createAction('[API] GET Arrivals Success', props<{data: IArrival}>());
     export const getStationsArrivalsError = createAction('[Api] GET Arrivals error');

    /* Line selected */
    export const selectLine = createAction('Select Line', props<{code: string}>());


}

