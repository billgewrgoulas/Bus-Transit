import { Dictionary } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { stat } from "fs";
import { ArrivalState, arrivalStateAdapter, IArrival, IArrivalDetails } from "../entities/arival.entity";
import { IBus, IRouteVeh, IRouteVehState } from "../entities/bus.entity";
import { ILine, LineState, lineStateAdapter } from "../entities/line.entity";
import { IMapData } from "../entities/map.data.entity";
import { IMlInfo } from "../entities/mLine.entity";
import { IRoute, RouteState } from "../entities/route.entity";
import { IStation, StationState } from "../entities/station.entity";
import { AppState } from "../reducers/api-reducer";

/* Line Feature Selectors */
const {selectEntities, selectAll} = lineStateAdapter.getSelectors();

export const getAppState = createFeatureSelector<AppState>('api');
export const getLineState = createSelector(getAppState, (state: AppState)=> state.lines);
export const getRouteState = createSelector(getAppState, (state: AppState) => state.routes);
export const getStationState = createSelector(getAppState, (state: AppState) => state.stations);
export const getArrivalState = createSelector(getAppState, (state: AppState) => state.arrivals);
export const getVehState = createSelector(getAppState, (state: AppState) => state.vehicles);
export const getMlState = createSelector(getAppState, (state: AppState) => state.mLines);
export const getScheduleState = createSelector(getAppState, (state: AppState) => state.schedules);

export const selectAllLines = createSelector(getLineState, selectAll);
export const selectLineEntities = createSelector(getLineState, selectEntities);
export const selectStationEntities = createSelector(getStationState, (stationState) => stationState.entities);
export const selectArrivalEntities = createSelector(getArrivalState, (arrivals) => arrivals.entities);
export const selectVehEntities = createSelector(getVehState, (state) => state.entities);
export const selectMlEntities = createSelector(getMlState, (state) => state.entities);
export const selectScheduleEntities = createSelector(getScheduleState, (state) => state.entities);

/* - Select the current line - */
export const currentLine = createSelector(
    getLineState, selectLineEntities,
    (state, entities)=> entities[state.activeLineId]
);

export const selectCurrentLineRoutes = createSelector(
    currentLine, getRouteState, 
    (line, routes: RouteState) => getRoutes(line!?.routeCodes, routes.entities)
);

/* Select line by lineCode */
export const selectLine = (lineCode: string) =>
    createSelector(getLineState, (lineState: LineState) => lineState.entities[lineCode]);

/* Select route by routeCode */
export const selectRoute = (routeCode: string) => 
    createSelector(getRouteState, (routes: RouteState) => routes.entities[routeCode]
);

/* Select the current route */
export const currentRoute = createSelector(getRouteState, 
    (routes: RouteState) => routes.entities[routes.activeRoute]
);

/* Select the active schedule for a line */
export const currentSchedule = createSelector(getScheduleState,
    (schedules) => schedules.entities[schedules.selectedSched]
);

/* Select the current route stations */
export const getRouteStations = createSelector(
    currentRoute, selectStationEntities,
    (route, stationEntities) => getStops(route!?.stopCodes, stationEntities)
);

/* Select the map data from the current route */
export const getRoutePathAndStops = createSelector(
    currentRoute, getRouteStations, 
    (route: any, stops: any): IMapData => {
        return {path: route!?.path, stations: stops};
    }
);

/* Get the details for a schedule */
export const schedDetails = (sdc_code: string) => 
    createSelector( currentLine, selectScheduleEntities, (line, schedules) =>{
        const id = `${line?.line_code}-${sdc_code}`;
        if(schedules[id]){
            return undefined;
        }else{
            return {lineCode: line?.line_code, sdc: sdc_code, ml: line?.ml_code};
        }
    } 
);

/* Select schedule days */
export const scheduleDays = createSelector(
    currentLine, selectMlEntities, (line, ml) => {

        const schedules: IMlInfo[] = [];
        if(line && line.sdc_codes){
            line.sdc_codes.forEach((code) =>{

                const masterline = ml[code];
                if(masterline){
                    schedules.push(masterline);
                }

            });
        }

        return schedules;
    }
);

/* Select the stop arrivals for a specific route and station */
export const stopSchedule = (stationCode: string) => 
    createSelector(selectArrivalEntities, currentRoute, (arrivals, route)=>
        arrivals[stationCode]?.arrivalDetails.filter(
            arrival => arrival.route_code === route?.RouteCode
        )
);

/* Select the stop arrivals for the current route and station */
export const currentStopSchedule = createSelector(
    selectArrivalEntities, currentRoute, getStationState, 
    (arrivals, route, state)=>{
        if(state.activeStationId !== ''){
            return arrivals[state.activeStationId]?.arrivalDetails.filter(
                arrival => arrival.route_code === route?.RouteCode
            )[0];
        }
        else return undefined
    }
);

/*Select the clicked station for the map details */
export const getActiveStation = createSelector(
    getStationState, (state: StationState) => state.entities[state.activeStationId]
);

/* Select the active route vehicles */
export const getRouteVeh = createSelector(
    getRouteState, selectVehEntities, 
    (routeState, vehicles) => vehicles[routeState.activeRoute]?.buses
);

/* - Select top 20 lines that match the filter - */
export const filterDropdown = (value: string)=>
    createSelector(selectAllLines, (lines: ILine[]) => 
        lines.filter((line: ILine) => includes(line.line_descr, value)).slice(0, 20)
);

/* Select the active route stops */
export const routeStopCodes = createSelector(
    currentRoute, (route) => getStopCodes(route)
);

export const getActiveBus = createSelector(
    getVehState, (veh: IRouteVehState) => veh.selectedBus
);

/* Select a route bus */
export const getSelectedBus = createSelector(
    currentRoute, selectVehEntities, getActiveBus,
    (route, buses, busCode) => filterActiveBus(route!, buses, busCode)
);

/* Get the next arrival for each station of a route */
export const getAllArrivals = createSelector(
    currentRoute, selectArrivalEntities, (route, arrivals) => {

        const arrival_info: any[] = [];
        if(route && route.stopCodes){
            route.stopCodes.forEach(stop => {
                const arrival = arrivals[stop];
                if(arrival){
                    const arr = arrival.arrivalDetails.find(e => e.route_code === route.RouteCode);
                    if(arr){
                        arrival_info.push({
                            veh_code: arr.veh_code, 
                            btime2: arr.btime2,
                            stop_code: stop
                        });
                    }
                }
            });
        }
        
        return arrival_info;
    }
);

/* Get all buses with arrival info THIS IS UGLY */
export const getBusStatus = createSelector(
    getAllArrivals, getRouteVeh, selectStationEntities, (arrivals, buses, stops) => {

        const buses_info: any = [];
        if(buses && arrivals){
            buses.forEach((bus: IBus) => {
                arrivals.sort((a: any, b: any) => a.btime2 - b.btime2);
                const arrival = arrivals.find((e: any) => e.veh_code === bus.VEH_NO);
                if(arrival){
                    const stop = stops[arrival.stop_code];
                    if(stop){
                        buses_info.push({
                            VEH_NO: bus.VEH_NO, 
                            NEXT_STOP: stop.StopDescr,
                            BTIME: arrival.btime2,
                            PASSENGERS: bus.PASSENGERS
                        });
                    }
                }
            });
        }

        return buses_info;
    }
);







/* Heleper Functions */
const includes = (lineDesc: string, value: string): boolean=>{
    return lineDesc.trim()
        .toLowerCase()
        .includes(value.trim().toLowerCase());
}

const getStops = (stopCodes: string[], stopEntities: Dictionary<any>) => {
    const stops: IStation[] = [];
    if(stopCodes) stopCodes.forEach(code => stops.push(stopEntities[code]));
    return stops;
}

const getRoutes = (routeCodes: string[], routeEntities: Dictionary<any>) => {
    const routes: IRoute[] = [];
    if(routeCodes) routeCodes.forEach(code => routes.push(routeEntities[code]));
    return routes;
}

const getStopCodes = (route?: IRoute): string[] =>{
    if(route) return route.stopCodes;
    return [];
}

const filterActiveBus = (route: IRoute, buses: Dictionary<IRouteVeh>, busCode: string) =>{
    if(buses && route) return buses[route.RouteCode]?.buses.filter((bus: IBus) => bus.VEH_NO === busCode);
    return [];
}

