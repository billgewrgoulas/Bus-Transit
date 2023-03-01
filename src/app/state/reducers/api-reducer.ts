import { Action, ActionReducer, createReducer, on} from "@ngrx/store";
import { inititialLineState, LineState, lineStateAdapter } from "../Entities/line.entity";
import { inititialRouteState, RouteState, routeStateAdapter } from "../Entities/route.entity";
import { inititialStopState, StopState, stopStateAdapter } from "../Entities/stop.entity";
import * as select_actions from '../Actions/select.actions';
import * as api_actions from '../Actions/api-calls.actions';
import { inititialSchdeduleState, ScheduleState, scheduleStateAdapter } from "../Entities/schedule.entity";
import { Plan } from "../Entities/itinerary";
import { BookingState, bookingStateAdapter, initialBookingState } from "../Entities/booking.entity";
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
    savedStops: string[] | undefined;
    savedRoutes: string[] | undefined;
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
    spinner: false,
    savedStops: undefined,
    savedRoutes: undefined,
};

export class Reducer{

    private static reducer: ActionReducer<AppState, Action> = createReducer(
        initialAppState,
        on(api_actions.getFilteredStopsSuccess, (state: AppState, action): AppState=>{
            return {...state, stops: stopStateAdapter.setAll(action.stops, state.stops), spinner: false};
        }),
        on(api_actions.getLinesSuccess, (state: AppState, action): AppState=>{
            return {...state, lines: lineStateAdapter.addMany(action.lines, state.lines), spinner: false};
        }),
        on(api_actions.getStopAndRoutesSuccess, (state: AppState, action): AppState=>{
            return {...state, 
                routes: routeStateAdapter.addMany(action.routes, state.routes), 
                stops: stopStateAdapter.addMany(action.stops, state.stops),
                spinner: false
            };
        }),
        on(select_actions.selectRoute, (state: AppState, action): AppState => {
            return {...state, routes: {...state.routes, activeRoute: action.code}, spinner: false};
        }),
        on(select_actions.selectStop, (state: AppState, action): AppState => {
            return {...state, stops:{...state.stops, activeStopCode: action.code}, spinner: false};
        }),
        on(api_actions.getLineRoutesSuccess, (state: AppState, action): AppState => {
            return {...state, routes: routeStateAdapter.setMany(action.routes, state.routes), spinner: false};
        }),
        on(api_actions.stopRoutesSuccess, (state: AppState, action): AppState => {
            return {...state, stops: stopStateAdapter.updateOne({
                id: action.stop, changes: {routes: action.routes}
            }, state.stops), spinner: false};
        }),
        on(api_actions.getSchedulesSuccess, (state: AppState, action): AppState => {
            return {...state, schedule: scheduleStateAdapter.setOne(action.schedules, state.schedule), spinner: false};
        }),
        on(api_actions.fetchPlanSuccess, (state: AppState, action): AppState => {
            return {...state, plan: action.data, spinner: false, occupancy: action.data.occupancy};
        }),
        on(api_actions.fetchBookingsSuccess, (state: AppState, action): AppState => {
            return {...state, spinner: false, bookings: bookingStateAdapter.setAll(action.data, state.bookings)};
        }),
        on(select_actions.selectItinerary, (state: AppState, action): AppState => {
            return {...state, itinerary: action.index};
        }),
        on(select_actions.emptyPlan, (state: AppState, action): AppState => {
            return {...state, plan: undefined, itinerary: -1};
        }),
        on(select_actions.selectBooking, (state: AppState, action): AppState => {
            return {...state, bookings: {...state.bookings, activeBooking: action.trip_id}};
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
        on(api_actions.deleteBooking, (state: AppState, action): AppState => {
            return {...state, spinner: false, bookings: bookingStateAdapter.removeOne(action.trip_id, state.bookings)};
        }),
        on(api_actions.addBooking, (state: AppState, action): AppState => {
            return {...state, spinner: false, bookings: bookingStateAdapter.addMany(action.bookings, state.bookings)};
        }),
        on(api_actions.saveStopSuccess, (state: AppState, action): AppState => {
            return {...state, spinner: false, savedStops: [...state.savedStops!, action.code]};
        }),
        on(api_actions.deleteStopSuccess, (state: AppState, action): AppState => {
            return {...state, spinner: false, savedStops: state.savedStops!.filter(code => code != action.code)};
        }),
        on(api_actions.saveRouteSuccess, (state: AppState, action): AppState => {
            return {...state, spinner: false, savedRoutes: [...state.savedRoutes!, action.code]};
        }),
        on(api_actions.deleteRouteSuccess, (state: AppState, action): AppState => {
            return {...state, spinner: false, savedRoutes: state.savedRoutes!.filter(code => code != action.code)};
        }),
        on(api_actions.getSavedInfoSuccess, (state: AppState, action): AppState => {
            return {...state, spinner: false, savedRoutes: action.routes, savedStops: action.stops};
        }),
        on(select_actions.emptyPath, (state: AppState, action): AppState => {
            return {...state,  routes: routeStateAdapter.updateOne({
                        id: state.routes.activeRoute, changes: {points: []}
                    }, state.routes),
                    schedule: scheduleStateAdapter.removeAll(state.schedule)
            };
        }),
        on(api_actions.getRouteDetailsuccess, (state: AppState, action): AppState => {
            return {...state, spinner: false, routes: routeStateAdapter.updateOne({
                        id: action.routeInfo.code, changes: {points: action.routeInfo.points},
                    }, state.routes), 
            };
        }),
        on(select_actions.updateOccupancy, (state: AppState, action): AppState => {
            
            const occupancy: Dictionary<number> = {...state.occupancy};
            for (const key in occupancy) {
                if (action.trip_ids.includes(+key)) {
                    occupancy[key]! -= action.value;
                }
            }
    
            return {...state, occupancy: occupancy};
        }),
        on(api_actions.getSavedInfoError, (state: AppState, action): AppState => {
            return {...state, spinner: false};
        }),
        on(api_actions.apiError, (state: AppState, action): AppState => {
            confirm('Error while trying to get data from the API');
            return {...state, spinner: false};
        }),
    );

    public static get getReducer(): ActionReducer<AppState, Action>{
        return this.reducer;
    }

}


