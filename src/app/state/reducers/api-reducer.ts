import { createReducer, on} from "@ngrx/store";
import { inititialLineState, LineState, lineStateAdapter } from "../Entities/line.entity";
import { inititialRouteState, RouteState, routeStateAdapter } from "../Entities/route.entity";
import { inititialStopState, StopState, stopStateAdapter } from "../Entities/stop.entity";
import * as select_actions from '../Actions/select.actions';
import * as api_actions from '../Actions/api-calls.actions';
import { inititialSchdeduleState, ScheduleState, scheduleStateAdapter } from "../Entities/schedule.entity";


export interface AppState{
    stops: StopState;
    lines: LineState;
    routes: RouteState;
    schedule: ScheduleState;
};

export const initialAppState: AppState = {
    lines: inititialLineState,
    stops: inititialStopState,
    routes: inititialRouteState,
    schedule: inititialSchdeduleState,
};

/* API Reducer */
export const appStateReducer = createReducer(
    initialAppState,
    on(api_actions.getLineRoutes, api_actions.getLines, (state: AppState, action): AppState=>{
        return {...state};
    }),
    on(api_actions.getFilteredStopsSuccess, (state: AppState, action): AppState=>{
        return {...state, stops: stopStateAdapter.setAll(action.stops, state.stops)};
    }),
    on(api_actions.routesFilteredSuccess, (state: AppState, action): AppState => {
        return {...state, routes: routeStateAdapter.setAll(action.routes, state.routes)};
    }),
    on(select_actions.emptyRoutes, (state: AppState, action): AppState => {
        return {...state, routes: routeStateAdapter.removeAll(state.routes)};
    }),
    on(api_actions.getLinesSuccess, (state: AppState, action): AppState=>{
        return {...state, lines: lineStateAdapter.addMany(action.lines, state.lines)};
    }),
    on(select_actions.selectLine, (state: AppState, action): AppState=>{
        return {...state, lines: {...state.lines, activeLineId: action.id}};
    }),
    on(select_actions.selectRoute, (state: AppState, action): AppState => {
        return {...state, routes: {...state.routes, activeRoute: action.code}};
    }),
    on(select_actions.selectStop, (state: AppState, action): AppState => {
        return {...state, stops:{...state.stops, activeStopCode: action.code}};
    }),
    on(api_actions.getLineRoutesSuccess, (state: AppState, action): AppState=>{
        return {...state, routes: routeStateAdapter.addMany(action.routes, state.routes)}
    }),
    on(api_actions.getSchedulesSuccess, (state: AppState, action): AppState => {
        return {...state, schedule: scheduleStateAdapter.addOne(action.schedules, state.schedule)};
    }),
    on(api_actions.getStopsSuccess, (state: AppState, action): AppState => {
        return {...state, stops: stopStateAdapter.addMany(action.stops, state.stops)};
    }),
    on(api_actions.getRouteDetailsuccess, (state: AppState, action): AppState=>{
        return {...state, stops: stopStateAdapter.addMany(action.routeInfo.stops, state.stops), 
                routes: routeStateAdapter.updateOne({id: action.routeInfo.code, changes: 
                {points: action.routeInfo.points}}, state.routes), 
        };
    }),
);
