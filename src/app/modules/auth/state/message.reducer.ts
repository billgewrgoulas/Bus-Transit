import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as api_actions from 'src/app/state/Actions/api-calls.actions';

export interface Notification{
    msg: string;
    spinner: boolean;
    type: string
};

export const initialNotification: Notification = {
    msg: '',
    spinner: false,
    type: ''
};

export const clearState = createAction('[Auth] Clear');

/* Auth Reducer */
export const authReducer = createReducer(initialNotification, 
    on(api_actions.loginError, api_actions.registerError, (state: Notification, action): Notification => {
        return {msg: action.msg.error.error, spinner: false, type: 'login'};
    }),
    on(clearState, (state: Notification, action): Notification => {
        return initialNotification;
    }),
);

export const getNotificationState = createFeatureSelector<Notification>('auth');
export const getMsg = createSelector(getNotificationState, (state)=> state.msg);