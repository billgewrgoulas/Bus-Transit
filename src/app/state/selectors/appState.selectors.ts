import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRoute, RouteState } from "../entities/route.entity";
import { IStop, stopStateAdapter } from "../entities/stop.entity";
import { AppState } from "../reducers/api-reducer";
import { lineStateAdapter } from "../entities/line.entity";
import { IMapData } from "../entities/map.data.entity";

export const getAppState = createFeatureSelector<AppState>('api');

/* Expose the nested states */
export const getLineState = createSelector(getAppState, (state: AppState)=> state.lines);
export const getRouteState = createSelector(getAppState, (state: AppState) => state.routes);
export const getStopState = createSelector(getAppState, (state: AppState) => state.stops);
export const getScheduleState = createSelector(getAppState, (state: AppState) => state.schedule);

/* Grab the state entities */
export const selectAllLines = createSelector(getLineState, (line) => line.entities);
export const selectAllRoutes = createSelector(getRouteState, (route) => route.entities);
export const selectAllStops = createSelector(getStopState, (stop) => stop.entities);
export const selectAllSchedules = createSelector(getScheduleState, (schedule) => schedule.entities);

/* Select all lines */
export const {selectAll} = lineStateAdapter.getSelectors();
export const getAllLines = createSelector(getLineState, selectAll);

/* Select all stops */
const selectStops = stopStateAdapter.getSelectors().selectAll;
export const getAllStops = createSelector(getStopState, selectStops);

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
    createSelector(selectAllLines, (lines) => lines[lineCode]);

/* Select route by routeCode */
export const selectRoute = (routeCode: string) => 
    createSelector(selectAllRoutes, (routes) => routes[routeCode]
);

/* Select the current route daily schedule */
export const getActiveRouteSchedules = createSelector(
    currentRoute, selectAllSchedules, (route, schedules) => {
        if(route){
            return schedules[route.code]?.schedules;
        }else{
            return undefined;
        }
    }
);

export const getDailySchedule = (day: number, stopCode: string) =>{
    return createSelector(getActiveRouteSchedules, (schedules) => {
        if(schedules){
            return schedules.filter(sch => sch.day == day && sch.stopCode == stopCode);
        }else{
            return [];
        }
    });
}

/* Select the current line routes */
export const selectCurrentLineRoutes = createSelector(
    currentLine, selectAllRoutes, (line, routeEntities) => {

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

/* Select route points */
export const selectRoutePoints = (code: string) => {
    return createSelector(selectAllRoutes, (routes) => routes[code]?.points);
}

/* Select the current route stops */
export const getRouteStops = createSelector(
    currentRoute, selectAllStops, (route, stopEntities) => {

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
    currentRoute, getRouteStops, (route, stops): IMapData => {
        return {points: route!?.points, stops: stops};
    }
);

/* Filter lines */
export const filterLines = (value: string) => {
    return createSelector(getAllLines, (lines) => {
        return lines.filter(line => 
            line.desc.includes(value.trim()) ||
            line.name.includes(value.trim())
        ).slice(0, 20);
    });
}
