import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IStop } from "./stop.entity";

export interface IRouteInfo{
    stops: IStop[];
    points: IPoint[];
    code: string;
}

export interface IPoint{
    id: string;
    longitude: string;
    latitude: string;
    routeCode: string;
}

export interface IRoute{
    id: string;
    code: string;
    lineId: string;
    direction: string;
    desc_eng: string;
    desc: string;
    name: string;
    stopCodes: string;
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