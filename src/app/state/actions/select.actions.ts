import { createAction, props } from "@ngrx/store";


 /* Line, station, bus and route changed */
 export const selectLine = createAction('Select Line', props<{id: string}>());
 export const selectRoute = createAction('Select Route', props<{code: string}>());
 export const selectStop = createAction('Select Station', props<{code: string}>());

 /* Empty the state info */
 export const emptyRoutes = createAction('Empty state');
