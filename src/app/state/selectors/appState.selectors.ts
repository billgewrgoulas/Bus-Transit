import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ILine } from "../entities/dataInterfaces";
import { lineStateAdapter } from "../entities/line.entity";
import { AppState } from "../reducers/api-reducer";

/* Line Feature Selectors */
const {selectEntities, selectAll} = lineStateAdapter.getSelectors();

export const getAppState = createFeatureSelector<AppState>('api');
export const getLineState = createSelector(getAppState, (state: AppState)=> state.lines);
export const selectAllLines = createSelector(getLineState, selectAll);
export const selectLineEntities = createSelector(getLineState, selectEntities);

/* - Select the current line - */
export const currentRoute = createSelector(
    getLineState,
    selectLineEntities,
    (state, entities)=> entities[state.activeLineId]
);

/* Select the curent route details */
export const routeDetails = createSelector(
    currentRoute,
    (lineEntity)=> lineEntity?.routesDetails
);

/* Select current route stations */
export const routeStations = createSelector(
    routeDetails,
    (route)=> route?.stations
);

/* - Select top 20 lines that match the filter - */
export const filterDropdown = (value: string)=>
    createSelector(selectAllLines, (lines: ILine[])=> 
        lines.filter((line: ILine)=>
            includes(line.line_descr, value)).slice(0, 20)
);









/* Heleper Functions */
const includes = (lineDesc: string, value: string): boolean=>{
    return lineDesc.trim()
        .toLowerCase()
        .includes(value.trim().toLowerCase())
}