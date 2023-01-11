import { createAction, props } from "@ngrx/store";
import * as exp from "constants";


 /* Line, booking, station, bus, itinerary and route changed */
 export const selectLine = createAction('Select Line', props<{id: string}>());
 export const selectRoute = createAction('Select Route', props<{code: string}>());
 export const selectStop = createAction('Select Stop', props<{code: string}>());
 export const selectBooking = createAction('Select Booking', props<{trip_id: number}>());
 export const selectItinerary = createAction('Select Itinerary', props<{index: number}>());

 /* Empty the state info */
 export const emptyRoutes = createAction('Empty state');
 export const emptyPlan = createAction('Empty plan');
 export const emptyPath = createAction('Empty path');

/* Change Module */ 
export const module = createAction('Change Modle', props<{module: string}>());
export const updateOccupancy = createAction('Update occupancy', props<{value: number, trip_ids: number[]}>());
