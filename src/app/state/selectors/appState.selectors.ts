import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LineState } from "../entities/line.entity";
import { IRoute, RouteState } from "../entities/route.entity";
import { IStop } from "../entities/stop.entity";
import { AppState } from "../reducers/api-reducer";
import { lineStateAdapter } from "../entities/line.entity";
import { IMapData } from "../entities/map.data.entity";

export const getAppState = createFeatureSelector<AppState>('api');

/* Expose the nested states */
export const getLineState = createSelector(getAppState, (state: AppState)=> state.lines);
export const getRouteState = createSelector(getAppState, (state: AppState) => state.routes);
export const getStopState = createSelector(getAppState, (state: AppState) => state.stops);

/* Grab the state entities */
export const selectAllLines = createSelector(getLineState, (line) => line.entities);
export const selectAllRoutes = createSelector(getRouteState, (route) => route.entities);
export const selectAllStops = createSelector(getStopState, (stop) => stop.entities);

/* Select all lines */
export const {selectAll} = lineStateAdapter.getSelectors();
export const getAllLines = createSelector(getLineState, selectAll);

export const getActiveStop = createSelector(
    getStopState, selectAllStops, (state, stops) => stops[state.activeStopCode]
);

/* - Select the current line - */
export const currentLine = createSelector(
    selectAllLines, getLineState,
    (lines, lineState)=> lines[lineState.activeLineId]
);

/* Select the current route */
export const currentRoute = createSelector(
    selectAllRoutes, getRouteState,
    (routes, routeState) => routes[routeState.activeRoute]
);

/* Select line by lineCode */
export const selectLine = (lineCode: string) =>
    createSelector(getLineState, (lineState: LineState) => lineState.entities[lineCode]);

/* Select route by routeCode */
export const selectRoute = (routeCode: string) => 
    createSelector(getRouteState, (routes: RouteState) => routes.entities[routeCode]
);

/* Select the current line routes */
export const selectCurrentLineRoutes = createSelector(
    currentLine, selectAllRoutes, 
    (line, routeEntities) => {

        const routes: IRoute[] = [];
        if(line){
            line.routeCodes.split(',').forEach(code => {
                const route: IRoute | undefined = routeEntities[code];
                if(route) routes.push(route);
            });
        }

        return routes;
    }
);

/* Select the current route stops */
export const getRouteStops = createSelector(
    currentRoute, selectAllStops,
    (route, stopEntities) => {

        const stops: IStop[] = [];
        if(route){
            route.stopCodes.split(',').forEach(code =>{
                const stop: IStop | undefined = stopEntities[code];
                if(stop) stops.push(stop);
            });
        }

        return stops;
    }
);

/* Select the map data from the current route */
export const getRoutePathAndStops = createSelector(
    currentRoute, getRouteStops, 
    (route, stops): IMapData => {
        return {points: route!?.points, stops: stops};
    }
);
