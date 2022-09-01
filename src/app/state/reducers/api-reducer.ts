
import { createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import { ILine} from "src/app/state/entities/dataInterfaces";
import * as actions from "../actions/api-calls.actions";
import { inititialLineState, LineState, lineStateAdapter } from "../entities/line.entity";

export interface AppState{
    stations: null;
    lines: LineState;
};

export const initialAppState: AppState = {
    lines: inititialLineState,
    stations: null
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
        return {...state, lines: {...state.lines, activeLine: action.code}};
    }),
    on(actions.requests.getLineRoutesSuccess, (state: AppState, action): AppState=>{
        return {...state, lines: lineStateAdapter.updateOne({
            id: state.lines.activeLine, 
            changes: {...state.lines.entities[state.lines.activeLine], routeCodes: action.details}
        }, state.lines)};
    }),
    on(actions.requests.getRouteDetailsuccess, (state: AppState, action): AppState=>{
        return {...state, lines: lineStateAdapter.updateOne({
            id: state.lines.activeLine, 
            changes: {...state.lines.entities[state.lines.activeLine], routesDetails: action.details}
        }, state.lines)};
    })
);

/* Line Feature Selectors */
const {selectEntities, selectAll} = lineStateAdapter.getSelectors();

export const getAppState = createFeatureSelector<AppState>('api');
export const getLineState = createSelector(getAppState, (state: AppState)=> state.lines);
export const selectAllLines = createSelector(getLineState, selectAll);
export const selectLineEntities = createSelector(getLineState, selectEntities);

/* - Select the current line - */
export const currentRoute = createSelector(
    getLineState,
    selectLineEntities,
    (state, entities)=> entities[state.activeLine]
);

/* Select the cuurent route details */
export const routeDetails = createSelector(
    currentRoute,
    (lineEntity)=> lineEntity?.routesDetails
);

/* Select current route stations */
export const routeStations = createSelector(
    routeDetails,
    (route)=> route?.stations
);

/* - Select top 20 lines that match the filter - */
export const filterDropdown = (value: string)=>
    createSelector(selectAllLines, (lines: ILine[])=> 
        lines.filter((line: ILine)=>
            includes(line.line_descr, value)).slice(0, 20)
);









/* Heleper Functions */
const includes = (lineDesc: string, value: string): boolean=>{
    return lineDesc.trim()
        .toLowerCase()
        .includes(value.trim().toLowerCase())
}




  


