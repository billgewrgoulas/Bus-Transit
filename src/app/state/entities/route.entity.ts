import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IRoute{
    RouteCode: string;
    LineCode: string;
    RouteDescr: string;
    RouteDescrEng: string;
    path: number[][];
    stopCodes: string[];
}

export interface RouteState extends EntityState<IRoute>{
    activeRoute: string;
    activeStops: string[];
};

export const routeStateAdapter: EntityAdapter<IRoute> = createEntityAdapter<IRoute>({
    selectId: (route: IRoute) => route.RouteCode
});

export const inititialRouteState: RouteState = routeStateAdapter.getInitialState({
    activeRoute: '',
    activeStops: []
});