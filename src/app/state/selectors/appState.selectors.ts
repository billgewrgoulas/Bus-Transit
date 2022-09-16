import { Dictionary } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArrivalState, arrivalStateAdapter } from "../entities/arival.entity";
import { ILine, LineState, lineStateAdapter } from "../entities/line.entity";
import { IRoute, RouteState } from "../entities/route.entity";
import { IStation } from "../entities/station.entity";
import { AppState } from "../reducers/api-reducer";

/* Line Feature Selectors */
const {selectEntities, selectAll} = lineStateAdapter.getSelectors();

export const getAppState = createFeatureSelector<AppState>('api');
export const getLineState = createSelector(getAppState, (state: AppState)=> state.lines);
export const getRouteState = createSelector(getAppState, (state: AppState) => state.routes);
export const getStationState = createSelector(getAppState, (state: AppState) => state.stations);
export const getArrivalState = createSelector(getAppState, (state: AppState) => state.arrivals);

export const selectAllLines = createSelector(getLineState, selectAll);
export const selectLineEntities = createSelector(getLineState, selectEntities);
export const selectStationEntities = createSelector(getRouteState, (routeState) => routeState.entities);
export const selectArrivalEntities = createSelector(getArrivalState, arrivalStateAdapter.getSelectors().selectEntities);

/* - Select the current line - */
export const currentLine = createSelector(
    getLineState,
    selectLineEntities,
    (state, entities)=> entities[state.activeLineId]
);

/* Select line by lineCode */
export const selectLine = (lineCode: string) =>
    createSelector(getLineState, (lineState: LineState) => lineState.entities[lineCode]);

/* Select route by routeCode */
export const selectRoute = (routeCode: string) => 
    createSelector(getRouteState, (routes: RouteState) => routes.entities[routeCode]);

/* Select the current route */
export const currentRoute = createSelector(
    getRouteState, 
    (routes: RouteState) => routes.entities[routes.activeRoute]
);

/* Select the current route stations */
export const getRouteStations = createSelector(
    currentRoute,
    selectStationEntities,
    (route, stationEntities) => getStops(route!?.stopCodes, stationEntities)
);


// /* Select the stop arrivals for a specific route*/
// export const stopSchedule = (stationCode: string) => 
//     createSelector(selectArrivalEntities, currentRoute, (arrivalEntites, line)=>
//         arrivalEntites[stationCode]?.arrivalInfo.filter((arrival)=>
//             parseInt(arrival.route_code) == line?.routeCodes[0]
//         )    
// );

// /* Select the active stops */
// export const selectedStops = createSelector(
//     getArrivalState, routeStations, 
//     (arrivalState: ArrivalState) => arrivalState.ids
// );

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

const getStops = (keys: string[], stopEntities: Dictionary<any>) => {
    const stops: IStation[] = [];
    keys.forEach(key => stops.push(stopEntities[key]));
    return stops;
}