
import { createReducer, on} from "@ngrx/store";
import * as actions from "../actions/api-calls.actions";
import { ArrivalState, arrivalStateAdapter, initialArrivalState } from "../entities/arival.entity";
import { inititialLineState, LineState, lineStateAdapter } from "../entities/line.entity";

export interface AppState{
    stations: null;
    lines: LineState;
    arrivals: ArrivalState
};

export const initialAppState: AppState = {
    lines: inititialLineState,
    arrivals: initialArrivalState,
    stations: null,
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
    on(actions.requests.getStationsArrivalsSuccess, (state: AppState, action): AppState=>{
        return {...state, arrivals: arrivalStateAdapter.setOne(action.data, state.arrivals)};
    }),
    on(actions.requests.getLineRoutesSuccess, (state: AppState, action): AppState=>{
        return {...state, lines: lineStateAdapter.updateOne({
            id: state.lines.activeLineId, 
            changes: {...state.lines.entities[state.lines.activeLineId], routeCodes: action.details}
        }, state.lines)};
    }),
    on(actions.requests.getRouteDetailsuccess, (state: AppState, action): AppState=>{
        return {...state, lines: lineStateAdapter.updateOne({
            id: state.lines.activeLineId, 
            changes: {...state.lines.entities[state.lines.activeLineId], routesDetails: action.details}
        }, state.lines)};
    })
);
