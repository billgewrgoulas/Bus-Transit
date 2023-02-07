import { createAction, props } from "@ngrx/store";
import { TripState } from "../../modules/planner/state/directions.store";
import { ILine } from "../Entities/line.entity";
import { IRoute, IRouteInfo } from "../Entities/route.entity";
import { IScheduleDetails } from "../Entities/schedule.entity";
import { IStop } from "../Entities/stop.entity";
import { Plan } from "../Entities/itinerary";
import { create } from "domain";
import { Booking } from "../Entities/booking.entity";

/* Fetch all lines based on station name, bus... */
export const getLines = createAction('[API] GET Lines');
export const getLinesSuccess = createAction('[API] Lines loaded success', props<{lines: ILine[]}>());
export const getLinesError = createAction('[API] Lines error', props<{msg: string}>());

/* Fetch all routes and stops... */
export const getStopAndRoutes = createAction('[API] GET SR');
export const getStopAndRoutesSuccess = createAction('[API] SR loaded success', props<{routes: IRoute[], stops: IStop[]}>());
export const getStopAndRoutesError = createAction('[API] SR error', props<{msg: string}>());

/*Get all the stops of the routes that pass through a stop */
export const getFilteredStops = createAction('[API] Filter Stops', props<{stopCode: string}>());
export const getFilteredStopsSuccess = createAction('[API] Stops filtered success', props<{stops: IStop[]}>());
export const getFilteredStopsError = createAction('[API] Filter error', props<{msg: string}>());

/* Fetch the routes of a line based on the lineCode */
export const getLineRoutes = createAction('[API] GET Details', props<{id: string}>());
export const getLineRoutesSuccess = createAction('[API] Routes Details Success', props<{routes: IRoute[]}>());
export const getLineRoutesError = createAction('[API] Details Loaded Failed', props<{msg: string}>());

/* Fetch route geopoints with stops */
export const getRouteDetails = createAction('[API] Get Route Details', props<{code: string}>());
export const getRouteDetailsuccess = createAction('[API] Loaded Success', props<{routeInfo: IRouteInfo}>());
export const getRouteDetailsError = createAction('[API] Details load error', props<{msg: string}>());

/* Fetch the weekly route schdules */
export const getSchedules = createAction('[API] Get route schdeules', props<{code: string}>());
export const getSchedulesSuccess = createAction('[API] Get route schedules success', props<{schedules: IScheduleDetails}>());
export const getSchedulesError = createAction('[API] Get schedules error', props<{msg: string}>());

/* Fetch the routes based on the selected stops */
export const getFilteredRoutes = createAction('[Api] Get filtered routes', props<{data: TripState}>());
export const routesFilteredSuccess = createAction('[API] Filtered routes success', props<{routes: IRoute[], add: any}>());
export const filteredRoutesError = createAction('[API] Filter Routes error', props<{msg: string}>());

/* Fetch the trip plan from Open Trip Planner */
export const fetchPlan = createAction('[API] Get plan', props<{data: TripState}>());
export const fetchPlanSuccess = createAction('[API] Get plan success', props<{data: Plan}>());
export const fetchPlanError = createAction('[API] Get plan error', props<{msg: string}>());

/* Login actions */
export const login = createAction('[API] Initiate login', props<{data: any}>());
export const loginSuccess = createAction('[API] Login success', props<{data: any}>());
export const loginError = createAction('[API] Login failed', props<{msg: any}>());
export const logOut = createAction('[Local] Logout', props<{msg: string}>());

/* Register */
export const register = createAction('[API] Initiate register', props<{credentials: any}>());
export const registerSuccess = createAction('[API] Register success', props<{data: any}>());
export const registerError = createAction('[API], Register failed', props<{msg: any}>());

/* Get the stop routes */
export const stopRoutes = createAction('[API] Get stop routes', props<{stopCode: string}>());
export const stopRoutesSuccess = createAction('[API] Get stop routes success', props<{routes: string[], stop: string}>());
export const stopRoutesError = createAction('[API] Stop routes error', props<{msg: string}>());

/* Get a plan with a single itinerary */
export const getItinerary = createAction('[API] Get itinerary', props<{data: Booking}>());
export const getItineraryError = createAction('[API] Get itinerary error', props<{msg: string}>());

/* spinner actions*/
export const showSpinner = createAction('Start spinner');
export const hideSpinner = createAction('Hide spinner');

/* Booking Actions */
export const fetchBookings = createAction('[API] Fetch Bookings');
export const fetchBookingsSuccess = createAction('[API] Fetch Bookings success', props<{data: Booking[]}>());
export const fetchBookingsError = createAction('[API] Fetch bookings error', props<{msg: string}>());
export const deleteBooking = createAction('[Local] Delete booking', props<{trip_id: number}>());
export const addBooking = createAction('[Local] Add booking', props<{bookings: Booking[]}>());

/* Saved stops actions */
export const saveStop = createAction('[API] Save stop', props<{code: string}>());
export const saveStopSuccess = createAction('[API] Save stop success', props<{code: string, msg: string}>());
export const saveStopError = createAction('[API] Save stop error', props<{msg: string}>());

export const deleteStop = createAction('[API] Delete stop', props<{code: string}>());
export const deleteStopSuccess = createAction('[API] Delete stop success', props<{code: string, msg: string}>());
export const deleteStopError = createAction('[API] Delete stop error', props<{msg: string}>());

/* Saved route actions */
export const saveRoute = createAction('[API] Save route', props<{code: string}>());
export const saveRouteSuccess = createAction('[API] Save route success', props<{code: string, msg: string}>());
export const saveRouteError = createAction('[API] Save route error', props<{msg: string}>());

export const deleteRoute = createAction('[API] Delete route', props<{code: string}>());
export const deleteRouteSuccess = createAction('[API] Delete route success', props<{code: string, msg: string}>());
export const deleteRouteError = createAction('[API] Delete route error', props<{msg: string}>());

/* Get saved info */
export const getSavedInfo = createAction('[API] Get saved info');
export const getSavedInfoSuccess = createAction('[API] Get saved info success', props<{stops: string[], routes: string[]}>());
export const getSavedInfoError = createAction('[API] Get saved info error', props<{msg: string}>());

export const apiError = createAction('[API] Server error', props<{msg?: string}>());