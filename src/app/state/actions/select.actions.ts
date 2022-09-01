
import { createAction, props } from "@ngrx/store";
import { Station } from "src/app/models/station";

export const selectRoute = createAction(
    '[Dropdown] Select Route',
    props<Station>()
);