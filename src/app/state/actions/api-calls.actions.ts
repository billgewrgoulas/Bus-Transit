import { createAction, props } from "@ngrx/store";
import { ILine, IRoute } from "../entities/dataInterfaces";

export module requests{

    /* Fetch all lines based on station name, bus... */
    export const getRoutes = createAction('[API] GET Routes');
    export const getRoutesSuccess = createAction('[API] Routes Loaded Success', props<{data: ILine[]}>());
    export const getRoutesError = createAction('[API] Routes Loaded Failed');

    /* Fetch the routes of a line based on the lineCode */
    export const getLineRoutes = createAction('[API] GET Details', props<{code: string}>());
    export const getLineRoutesSuccess = createAction('[API] Routes Details Success', props<{details: number[]}>());
    export const getLineRoutesError = createAction('[API] Details Loaded Failed');

    /* Fetch route geopoints with stops */
    export const getRouteDetails = createAction('[API] Get Route Details', props<{routeCode: string}>());
    export const getRouteDetailsuccess = createAction('[API] Loaded Success', props<{details: IRoute}>());
    export const getRouteDetailsError = createAction('[API] Details load error');

    /* Line selected */
    export const selectLine = createAction('Select Line', props<{code: string}>());

}

