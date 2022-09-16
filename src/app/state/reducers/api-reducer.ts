
import { act } from "@ngrx/effects";
import { createReducer, on} from "@ngrx/store";
import * as actions from "../actions/api-calls.actions";
import { ArrivalState, arrivalStateAdapter, initialArrivalState } from "../entities/arival.entity";
import { BusState, inititialBusState } from "../entities/bus.entity";
import { inititialJoinState, JoinState, joinStateAdapter } from "../entities/join.entity";
import { inititialLineState, LineState, lineStateAdapter } from "../entities/line.entity";
import { inititialRouteState, RouteState, routeStateAdapter, IRoute } from "../entities/route.entity";
import { inititialStationState, StationState, stationStateAdapter } from "../entities/station.entity";

export interface AppState{
    stations: StationState;
    lines: LineState;
    arrivals: ArrivalState;
    routes: RouteState;
    buses: BusState
};

export const initialAppState: AppState = {
    lines: inititialLineState,
    arrivals: initialArrivalState,
    stations: inititialStationState,
    buses: inititialBusState,
    routes: inititialRouteState,
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
    on(actions.requests.getLineRoutesSuccess, (state: AppState, action): AppState=>{
        return {...state, routes: routeStateAdapter.addMany(action.data, state.routes), 
                lines: lineStateAdapter.updateOne({id: action.lineCode, changes: {routeCodes: getRouteCodes(action.data)}}, state.lines)};
    }),
    on(actions.requests.getRouteDetailsuccess, (state: AppState, action): AppState=>{
        return {...state, 
            stations: stationStateAdapter.addMany(action.data.stops, state.stations), 
            routes: routeStateAdapter.updateOne({id: action.code, changes: 
                {path: action.data.path, stopCodes: getCodes(action.data.stops)}}, state.routes), 
        };
    }),
    // on(actions.requests.getStationsArrivalsSuccess, (state: AppState, action): AppState=>{
    //     return {...state, arrivals: arrivalStateAdapter.setOne(action.data, state.arrivals)};
    // }),
    
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
