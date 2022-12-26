import { createReducer, on} from "@ngrx/store";
import { inititialLineState, LineState, lineStateAdapter } from "../Entities/line.entity";
import { inititialRouteState, RouteState, routeStateAdapter } from "../Entities/route.entity";
import { inititialStopState, StopState, stopStateAdapter } from "../Entities/stop.entity";
import * as select_actions from '../Actions/select.actions';
import * as api_actions from '../Actions/api-calls.actions';
import { inititialSchdeduleState, ScheduleState, scheduleStateAdapter } from "../Entities/schedule.entity";
import { Plan } from "../Entities/itinerary";
import { BookingState, initialBookingState } from "../Entities/booking.entity";
import { Dictionary } from "@ngrx/entity";

export interface AppState{
    stops: StopState;
    lines: LineState;
    routes: RouteState;
    schedule: ScheduleState;
    bookings: BookingState;
    plan: Plan | undefined;
    occupancy: Dictionary<number>;
    itinerary: number;
    module: string;
    spinner: boolean;
};

export const initialAppState: AppState = {
    lines: inititialLineState,
    stops: inititialStopState,
    routes: inititialRouteState,
    schedule: inititialSchdeduleState,
    bookings: initialBookingState,
    occupancy: {},
    plan: undefined,
    itinerary: -1,
    module: '',
    spinner: false
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
    on(api_actions.getLinesSuccess, (state: AppState, action): AppState=>{
        return {...state, lines: lineStateAdapter.addMany(action.lines, state.lines)};
    }),
    on(select_actions.selectRoute, (state: AppState, action): AppState => {
        return {...state, routes: {...state.routes, activeRoute: action.code}};
    }),
    on(select_actions.selectStop, (state: AppState, action): AppState => {
        return {...state, stops:{...state.stops, activeStopCode: action.code}};
    }),
    on(api_actions.getLineRoutesSuccess, api_actions.stopRoutesSuccess, (state: AppState, action): AppState => {
        return {...state, routes: routeStateAdapter.setAll(action.routes, state.routes)};
    }),
    on(api_actions.getSchedulesSuccess, (state: AppState, action): AppState => {
        return {...state, schedule: scheduleStateAdapter.setOne(action.schedules, state.schedule)};
    }),
    on(api_actions.getStopsSuccess, (state: AppState, action): AppState => {
        return {...state, stops: stopStateAdapter.addMany(action.stops, state.stops)};
    }),
    on(api_actions.fetchPlanSuccess, (state: AppState, action): AppState => {
        console.log(action.data);
        return {...state, plan: action.data, spinner: false, occupancy: action.data.occupancy};
    }),
    on(select_actions.selectItinerary, (state: AppState, action): AppState => {
        return {...state, itinerary: action.index};
    }),
    on(select_actions.emptyPlan, (state: AppState, action): AppState => {
        return {...state, plan: undefined, itinerary: -1};
    }),
    on(select_actions.selectLine, (state: AppState, action): AppState => {
        return {...state, lines: {...state.lines, activeLineId: action.id}, schedule: scheduleStateAdapter.removeAll(state.schedule)};
    }),
    on(select_actions.module, (state: AppState, action): AppState => {
        return {...state, module: action.module};
    }),
    on(api_actions.showSpinner, (state: AppState, action): AppState => {
        return {...state, spinner: true};
    }),
    on(api_actions.getRouteDetailsuccess, (state: AppState, action): AppState => {
        return {...state, stops: stopStateAdapter.addMany(action.routeInfo.stops, state.stops), 
                routes: routeStateAdapter.updateOne({id: action.routeInfo.code, changes: 
                {points: action.routeInfo.points}}, state.routes), 
        };
    }),
    on(select_actions.updateOccupancy, (state: AppState, action): AppState => {
        
        const occupancy: Dictionary<number> = {...state.occupancy};
        for (const key in occupancy) {
            if (action.trip_ids.includes(+key)) {
                occupancy[key]! += action.value;
            }
        }

        return {...state, occupancy: occupancy};
    }),
);
