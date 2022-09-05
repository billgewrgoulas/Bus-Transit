
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');
export const {
    selectCurrentRoute, // select the current route
    selectFragment, // select the current route fragment
    selectQueryParams, // select the current route query params
    selectQueryParam, // factory function to select a query param
    selectRouteParams, // select the current route params
    selectRouteParam, // factory function to select a route param
    selectRouteData, // select the current route data
    selectUrl, // select the current url
    selectTitle, // Select the title if available
} = getSelectors();

export const selectCurrent = createSelector(
    selectRouter,
    (s1)=> s1.state
);

export const getState = createSelector(
    selectCurrent, 
    selectCurrentRoute
);


