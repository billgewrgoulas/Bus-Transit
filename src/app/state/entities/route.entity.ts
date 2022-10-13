import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IRoute{
    RouteCode: string;
    LineCode: string;
    RouteDescr: string;
    RouteDescrEng: string;
    path: number[][];
    stopCodes: string[];
    bookedStops: number;
}

export interface RouteState extends EntityState<IRoute>{
    activeRoute: string;
};

export const routeStateAdapter: EntityAdapter<IRoute> = createEntityAdapter<IRoute>({
    selectId: (route: IRoute) => route.RouteCode
});

export const inititialRouteState: RouteState = routeStateAdapter.getInitialState({
    activeRoute: '',
});