import { createAction, props } from "@ngrx/store";
import { TripState } from "../LocalStore/directions.store";
import { ILine } from "../Entities/line.entity";
import { IRoute, IRouteInfo } from "../Entities/route.entity";
import { IScheduleDetails } from "../Entities/schedule.entity";
import { IStop } from "../Entities/stop.entity";
import { Itinerary, Plan } from "../Entities/itinerary";
import { Booking } from "../Entities/booking.entity";

/* Fetch all lines based on station name, bus... */
export const getLines = createAction('[API] GET Lines');
export const getLinesSuccess = createAction('[API] Lines loaded success', props<{lines: ILine[]}>());
export const getLinesError = createAction('[API] Lines error');

/* Fetch all stops */
export const getStops = createAction('[API] GET Stops');
export const getStopsSuccess = createAction('[API] Stops loaded success', props<{stops: IStop[]}>());
export const getStopsError = createAction('[API] Stops error');

/*Get all the stops of the routes that pass through a stop */
export const getFilteredStops = createAction('[API] Filter Stops', props<{stopCode: string}>());
export const getFilteredStopsSuccess = createAction('[API] Stops filtered success', props<{stops: IStop[]}>());
export const getFilteredStopsError = createAction('[API] Filter error');

/* Fetch the routes of a line based on the lineCode */
export const getLineRoutes = createAction('[API] GET Details', props<{id: string}>());
export const getLineRoutesSuccess = createAction('[API] Routes Details Success', props<{routes: IRoute[]}>());
export const getLineRoutesError = createAction('[API] Details Loaded Failed');

/* Fetch route geopoints with stops */
export const getRouteDetails = createAction('[API] Get Route Details', props<{code: string}>());
export const getRouteDetailsuccess = createAction('[API] Loaded Success', props<{routeInfo: IRouteInfo}>());
export const getRouteDetailsError = createAction('[API] Details load error');

/* Fetch the weekly route schdules */
export const getSchedules = createAction('[API] Get route schdeules', props<{code: string}>());
export const getSchedulesSuccess = createAction('[API] Get route schedules success', props<{schedules: IScheduleDetails}>());
export const getSchedulesError = createAction('[API] Get schedules error');

/* Fetch the routes based on the selected stops */
export const getFilteredRoutes = createAction('[Api] Get filtered routes', props<{data: TripState}>());
export const routesFilteredSuccess = createAction('[API] Filtered routes success', props<{routes: IRoute[], add: any}>());
export const filteredRoutesError = createAction('[API] Filter Routes error');

/* Fetch the trip plan from Open Trip Planner */
export const fetchPlan = createAction('[API] Get plan', props<{data: TripState}>());
export const fetchPlanSuccess = createAction('[API] Get plan success', props<{data: Plan}>());
export const fetchPlanError = createAction('[API] Get plan error');

/* Login actions */
export const login = createAction('[API] Initiate login', props<{data: any}>());
export const loginSuccess = createAction('[API] Login success', props<{data: any}>());
export const loginError = createAction('[API] Initiate login failed');

/* Register */
export const register = createAction('[API] Initiate register', props<{credentials: any}>());
export const registerSuccess = createAction('[API] Register success', props<{data: any}>());
export const registerError = createAction('[API], Register failed');

/* Booking actions */
export const book = createAction('[API] Book Itinerary', props<{data: Booking[]}>);
export const bookSuccess = createAction('[API] Book success', props<{data: any}>());
export const bookError = createAction('[API] Book error');