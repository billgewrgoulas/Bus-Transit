import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IStop } from "./stop.entity";

export interface IRouteInfo{
    stops: IStop[];
    points: IPoint[];
}

export interface IPoint{
    id: number;
    longitude: string;
    latitude: string;
    routeCode: string;
}

export interface IRoute{
    id: number;
    code: string;
    lineId: number;
    direction: number;
    desc_eng: string;
    desc: string;
    stopCodes: string[];
    points: IPoint[];
}

export interface RouteState extends EntityState<IRoute>{
    activeRoute: string;
};

export const routeStateAdapter: EntityAdapter<IRoute> = createEntityAdapter<IRoute>({
    selectId: (route: IRoute) => route.code
});

export const inititialRouteState: RouteState = routeStateAdapter.getInitialState({
    activeRoute: '',
});