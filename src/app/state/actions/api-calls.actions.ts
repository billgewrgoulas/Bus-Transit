import { createAction, props } from "@ngrx/store";
import { ILine } from "../entities/line.entity";
import { IRoute, IRouteInfo } from "../entities/route.entity";


/* Fetch all lines based on station name, bus... */
export const getLines = createAction('[API] GET Lines');
export const getLinesSuccess = createAction('[API] Lines loaded success', props<{lines: ILine[]}>());
export const getLinesError = createAction('[API] Lines error');

/* Fetch the routes of a line based on the lineCode */
export const getLineRoutes = createAction('[API] GET Details', props<{id: string}>());
export const getLineRoutesSuccess = createAction('[API] Routes Details Success', props<{routes: IRoute[]}>());
export const getLineRoutesError = createAction('[API] Details Loaded Failed');

/* Fetch route geopoints with stops */
export const getRouteDetails = createAction('[API] Get Route Details', props<{code: string}>());
export const getRouteDetailsuccess = createAction('[API] Loaded Success', props<{routeInfo: IRouteInfo}>());
export const getRouteDetailsError = createAction('[API] Details load error');
