import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArrivalState, arrivalStateAdapter } from "../entities/arival.entity";
import { ILine } from "../entities/dataInterfaces";
import { LineState, lineStateAdapter } from "../entities/line.entity";
import { AppState } from "../reducers/api-reducer";

/* Line Feature Selectors */
const {selectEntities, selectAll} = lineStateAdapter.getSelectors();

export const getAppState = createFeatureSelector<AppState>('api');
export const getLineState = createSelector(getAppState, (state: AppState)=> state.lines);
export const getArrivalState = createSelector(getAppState, (state: AppState) => state.arrivals);

export const selectAllLines = createSelector(getLineState, selectAll);
export const selectLineEntities = createSelector(getLineState, selectEntities);
export const selectArrivalEntities = createSelector(getArrivalState, arrivalStateAdapter.getSelectors().selectEntities);

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

/* Select the stop arrivals for a specific route*/
export const stopSchedule = (stationCode: string) => 
    createSelector(selectArrivalEntities, currentRoute, (arrivalEntites, line)=>
        arrivalEntites[stationCode]?.arrivalInfo.filter((arrival)=>
            parseInt(arrival.route_code) == line?.routeCodes[0]
        )    
);

/* Select the active stops */
export const selectedStops = createSelector(
    getArrivalState, routeStations, 
    (arrivalState: ArrivalState) => arrivalState.ids
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