
import { createReducer, on, State} from "@ngrx/store";
import * as actions from "../actions/api-calls.actions";
import * as socket from "../actions/socketIO.actions";
import { ArrivalState, arrivalStateAdapter, initialArrivalState } from "../entities/arival.entity";
import { inititialIRouteVehState, IRouteVeh, IRouteVehState, vehStateAdapter } from "../entities/bus.entity";
import { inititialLineState, LineState, lineStateAdapter } from "../entities/line.entity";
import { inititialRouteState, RouteState, routeStateAdapter } from "../entities/route.entity";
import { inititialStationState, StationState, stationStateAdapter } from "../entities/station.entity";

export interface AppState{
    stations: StationState;
    lines: LineState;
    arrivals: ArrivalState;
    routes: RouteState;
    vehicles: IRouteVehState;
};

export const initialAppState: AppState = {
    lines: inititialLineState,
    arrivals: initialArrivalState,
    stations: inititialStationState,
    routes: inititialRouteState,
    vehicles: inititialIRouteVehState,
};

/* API Reducer */
export const lineStateReducer = createReducer(
    initialAppState,
    on(actions.requests.getRoutes, actions.requests.getLineRoutes, (state: AppState, action): AppState=>{
        return {...state};
    }),
    on(actions.requests.getRoutesSuccess, (state: AppState, action): AppState=>{
        return {...state, lines: lineStateAdapter.addMany(action.data, state.lines)};
    }),
    on(actions.requests.selectLine, (state: AppState, action): AppState=>{
        return {...state, lines: {...state.lines, activeLineId: action.code}};
    }),
    on(actions.requests.selectRoute, (state: AppState, action): AppState => {
        return {...state, routes: {...state.routes, activeRoute: action.routeCode}};
    }),
    on(actions.requests.selectStation, (state: AppState, action): AppState => {
        return {...state, stations:{...state.stations, activeStationId: action.stopCode}};
    }),
    on(actions.requests.getStationsArrivalsSuccess, (state: AppState, action): AppState =>{
        return {...state, arrivals: arrivalStateAdapter.setOne(action.data, state.arrivals)};
    }),
    on(socket.SocketActions.busLocationsUpdates, (state: AppState, action): AppState =>{
        return {...state, vehicles: vehStateAdapter.setOne(action.data, state.vehicles)};
    }),
    on(actions.requests.getLineRoutesSuccess, (state: AppState, action): AppState=>{
        return {...state, routes: routeStateAdapter.addMany(action.data, state.routes), 
                    lines: lineStateAdapter.updateOne({id: action.lineCode, changes: {
                    routeCodes: getRouteCodes(action.data)}}, state.lines)};
    }),
    on(actions.requests.getRouteDetailsuccess, (state: AppState, action): AppState=>{
        return {...state, 
                stations: stationStateAdapter.addMany(action.data.stops, state.stations), 
                routes: routeStateAdapter.updateOne({id: action.code, changes: 
                {path: action.data.path, stopCodes: getCodes(action.data.stops)}}, state.routes), 
        };
    }),
);


/* Some Helpers */
const getCodes = (stops: any[]) => {
    const codes: string[] = [];
    stops.forEach(stop=>codes.push(stop.StopCode));
    return codes;
}

const getRouteCodes = (routes: any[]) => {
    const codes: string[] = [];
    routes.forEach(route=>codes.push(route.RouteCode));
    return codes;
}
