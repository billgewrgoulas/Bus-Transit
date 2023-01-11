
import { Params } from "@angular/router";
import { createAction, props } from "@ngrx/store";

export const arrowNavigation = createAction('[Sidebar] Go Back');
export const linesModule = createAction('[Router] Load Data', props<{params: Params | undefined}>());
export const placesMap = createAction('[Routes] Places map');