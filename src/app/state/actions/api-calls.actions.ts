import { createAction, props } from "@ngrx/store";
import { ILine } from "../entities/line.entity";
import { IRoute, IRouteInfo } from "../entities/route.entity";
import { IScheduleDetails } from "../entities/schedule.entity";
import { IStop } from "../entities/stop.entity";

/* Fetch all lines based on station name, bus... */
export const getLines = createAction('[API] GET Lines');
export const getLinesSuccess = createAction('[API] Lines loaded success', props<{lines: ILine[]}>());
export const getLinesError = createAction('[API] Lines error');

/* Fetch all stops */
export const getStops = createAction('[API] GET Stops');
export const getStopsSuccess = createAction('[API] Stops loaded success', props<{stops: IStop[]}>());
export const getStopsError = createAction('[API] Stops error');

/* Fetch the routes of a line based on the lineCode */
export const getLineRoutes = createAction('[API] GET Details', props<{id: string}>());
export const getLineRoutesSuccess = createAction('[API] Routes Details Success', props<{routes: IRoute[]}>());
export const getLineRoutesError = createAction('[API] Details Loaded Failed');

/* Fetch route geopoints with stops */
export const getRouteDetails = createAction('[API] Get Route Details', props<{code: string}>());
export const getRouteDetailsuccess = createAction('[API] Loaded Success', props<{routeInfo: IRouteInfo}>());
export const getRouteDetailsError = createAction('[API] Details load error');

/* Fetch the weekly route schdeules */
export const getSchedules = createAction('[API] Get route schdeules', props<{code: string}>());
export const getSchedulesSuccess = createAction('[API] Get route schedules success', props<{schedules: IScheduleDetails}>());
export const getSchedulesError = createAction('[API] Get schedules error');