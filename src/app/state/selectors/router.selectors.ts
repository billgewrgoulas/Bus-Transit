import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from './custom-route-serializer';

export const selectRouter = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

/* Current URL */
export const {selectUrl} = getSelectors(selectRouter);

/* Current Route Params */
export const getParams = createSelector(selectRouter, (router) => {
    if(router){
        return router.state.params;
    }else{
        return undefined;
    }
});

/* Optional q params */
export const queryParams = createSelector(selectRouter, (router) => {
    if(router){
        return router.state.queryParams
    }else{
        return undefined;
    }
});

/* get the entire state */
export const getState = createSelector(
    selectUrl, getParams, queryParams, (url, params, query) => {
        return {url, params, query};
    }
);

