import { createAction, props } from "@ngrx/store";


/* Add/remove a marker to/from the map */
export const addStart = createAction('[MAP] Start', props<{data: string[]}>());
export const addEnd = createAction('[MAP] End', props<{data: string[]}>());

export const removeEnds = createAction('[MAP] Remove ends');
export const removeStart = createAction('[MAP] Remove Start');
export const removeEnd = createAction('[MAP] Remove End');
