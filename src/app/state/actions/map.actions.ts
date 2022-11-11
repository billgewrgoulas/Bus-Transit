import { createAction, props } from "@ngrx/store";


/* Add/remove a marker to/from the map */
export const addStart = createAction('[MAP] Start', props<{data: string[]}>());
export const addEnd = createAction('[MAP] End', props<{data: string[]}>());
export const swapPoints = createAction('[MAP] Swap Points');

export const removeEnds = createAction('[MAP] Remove ends');
