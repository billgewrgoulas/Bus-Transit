import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { IPoint } from "../entities/route.entity";
import { IStop } from "../entities/stop.entity";
import * as map_actions from "../actions/map.actions";


export interface MapState{
    start: string[];
    end: string[];
    stops: IStop[];
    points: IPoint[];
}

export const initialMapState: MapState = {
    stops: [],
    points: [],
    start: [],
    end: []
}

export const mapStateReducer = createReducer(
    initialMapState,
    on(map_actions.addStart, (state: MapState, action): MapState => {
        return {...state, start: action.data};
    }),
    on(map_actions.addEnd, (state: MapState, action): MapState => {
        return {...state, end: action.data};
    }),
    on(map_actions.removeEnds, (state: MapState, action): MapState => {
        return initialMapState;
    }),
);

export const getMapState = createFeatureSelector<MapState>('map');

/* fetch all the markers from the state */
export const getState = (state: MapState) => state;

export const getStart = createSelector(
    getMapState, (state: MapState) => state.start
);

export const getEnd = createSelector(
    getMapState, (state: MapState) => state.end
);