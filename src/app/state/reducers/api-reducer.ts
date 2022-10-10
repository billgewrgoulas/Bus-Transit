
import { createReducer, on, State} from "@ngrx/store";
import { builtinModules } from "module";
import * as actions from "../actions/api-calls.actions";
import * as socket from "../actions/socketIO.actions";
import { ArrivalState, arrivalStateAdapter, initialArrivalState } from "../entities/arival.entity";
import { inititialIRouteVehState, IRouteVeh, IRouteVehState, vehStateAdapter } from "../entities/bus.entity";
import { inititialLineState, LineState, lineStateAdapter } from "../entities/line.entity";
import { IMLineState, inititialMLineState, mLStateAdapter } from "../entities/mLine.entity";
import { inititialRouteState, RouteState, routeStateAdapter } from "../entities/route.entity";
import { inititialStationState, StationState, stationStateAdapter } from "../entities/station.entity";

export interface AppState{
    stations: StationState;
    lines: LineState;
    arrivals: ArrivalState;
    routes: RouteState;
    vehicles: IRouteVehState;
    mLines: IMLineState
};

export const initialAppState: AppState = {
    lines: inititialLineState,
    arrivals: initialArrivalState,
    stations: inititialStationState,
    routes: inititialRouteState,
    vehicles: inititialIRouteVehState,
    mLines: inititialMLineState
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
        return {...state, arrivals: arrivalStateAdapter.setMany(action.data, state.arrivals)};
    }),
    on(socket.SocketActions.busLocationsUpdates, (state: AppState, action): AppState =>{
        return {...state, vehicles: vehStateAdapter.setOne(action.data, state.vehicles)};
    }),
    on(actions.requests.selectBus, (state: AppState, action): AppState => {
        return {...state, vehicles: {...state.vehicles, selectedBus: action.busCode}};
    }),
    on(actions.requests.getLineRoutesSuccess, (state: AppState, action): AppState=>{
        return {...state, routes: routeStateAdapter.addMany(action.data.routes, state.routes), 
                mLines: mLStateAdapter.addMany(action.data.mlInfo, state.mLines),
                lines: lineStateAdapter.updateOne({id: action.data.lineCode, changes: {
                routeCodes: getRouteCodes(action.data.routes),
                sdc_codes: getSdcs(action.data.mlInfo)}}, state.lines)};
    }),
    on(actions.requests.getRouteDetailsuccess, (state: AppState, action): AppState=>{
        return {...state, stations: stationStateAdapter.addMany(action.data.stops, state.stations), 
                routes: routeStateAdapter.updateOne({id: action.code, changes: {
                path: action.data.path, stopCodes: getCodes(action.data.stops)}}, state.routes), 
        };
    }),
);


/* Some Helpers */
const getCodes = (stops: any[]) => {
    const codes: string[] = [];
    stops.forEach(stop => codes.push(stop.StopCode));
    return codes;
}

const getRouteCodes = (routes: any[]) => {
    const codes: string[] = [];
    routes.forEach(route => codes.push(route.RouteCode));
    return codes;
}

const getSdcs = (ml: any[]) => {
    const codes: string[] = [];
    ml.forEach(m => codes.push(m.sdc_code));
    return codes;
}
