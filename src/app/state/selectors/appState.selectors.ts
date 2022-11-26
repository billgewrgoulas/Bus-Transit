import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRoute, RouteState, routeStateAdapter } from "../Entities/route.entity";
import { IStop, stopStateAdapter } from "../Entities/stop.entity";
import { AppState } from "../Reducers/api-reducer";
import { lineStateAdapter } from "../Entities/line.entity";
import { IMapData, TripData } from "../Entities/map.data.entity";

export const getAppState = createFeatureSelector<AppState>('api');

/* Expose the nested states */
export const getLineState = createSelector(getAppState, (state: AppState)=> state.lines);
export const getRouteState = createSelector(getAppState, (state: AppState) => state.routes);
export const getStopState = createSelector(getAppState, (state: AppState) => state.stops);
export const getScheduleState = createSelector(getAppState, (state: AppState) => state.schedule);
export const getPlanState = createSelector(getAppState, state => state.plan);

/* Grab the state entities */
export const selectAllLines = createSelector(getLineState, (line) => line.entities);
export const selectAllRoutes = createSelector(getRouteState, (route) => route.entities);
export const selectAllStops = createSelector(getStopState, (stop) => stop.entities);
export const selectAllSchedules = createSelector(getScheduleState, (schedule) => schedule.entities);

/* Select all lines */
export const {selectAll} = lineStateAdapter.getSelectors();
export const getAllLines = createSelector(getLineState, selectAll);

/* Select all routes */
const getAllRoutes = routeStateAdapter.getSelectors().selectAll;
export const getRouteList = createSelector(getRouteState, getAllRoutes);

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

export const selectStop = (code: string) => 
    createSelector(selectAllStops, (stops) => stops[code]
);

/* Select the current route daily schedule */
export const getActiveRouteSchedules = createSelector(
    currentRoute, selectAllSchedules, (route, schedules) => {
        if(!route) return undefined;
        return schedules[route.code]?.schedules;
    }
);

export const getDailySchedule = (day: number, stopCode: string) =>{
    return createSelector(getActiveRouteSchedules, (schedules) => {
        if(!schedules)return [];
        return schedules.filter(sch => sch.day == day && sch.stopCode == stopCode);
    });
}

/* Select the current line routes */
export const selectCurrentLineRoutes = createSelector(
    currentLine, selectAllRoutes, (line, routeEntities) => {

        const routes: IRoute[] = [];
        if(!line) return routes;

        line.routeCodes.split(',').forEach(code => {
            const route: IRoute | undefined = routeEntities[code];
            if(route) routes.push(route);
        });
        
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
        if(!route) return stops;

        route.stopCodes.split(',').forEach(code =>{
            const stop: IStop | undefined = stopEntities[code];
            if(stop) stops.push(stop);
        });
        
        return stops;
    }
);

/* Select the map data from the current route */
export const getRoutePathAndStops = createSelector(
    currentRoute, getRouteStops, (route, stops): IMapData | undefined => {
        if(!(route && route.points)) return undefined;
        return {points: route.points, stops: stops};
    }
);

/* Filter lines */
export const filterLines = (value: string) => {
    return createSelector(getAllLines, (lines) => {
        return lines.filter(line => 
            line.desc.toLowerCase().includes(value.trim().toLowerCase()) ||
            line.name.toLowerCase().includes(value.trim().toLowerCase())
        ).slice(0, 20);
    });
}

/* Filter stops*/
export const filterStops = (value: string) => {
    return createSelector(getAllStops, (stops) => {
        return stops.filter(stop => 
            stop.desc.toLowerCase().includes(value.trim().toLowerCase()) ||
            stop.code.includes(value.trim().toLowerCase())
        ).slice(0, 20);
    });
}
