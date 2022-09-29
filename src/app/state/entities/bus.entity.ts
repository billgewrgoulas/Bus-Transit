import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IBus{
    VEH_NO: string;
    CS_DATE: string;
    CS_LAT: string;
    CS_LNG: string;
    ROUTE_CODE: string;
}

export interface IRouteVeh{
    buses: IBus[];
    ROUTE_CODE: string;
}

export interface IRouteVehState extends EntityState<IRouteVeh>{
    selectedBus: string;
};

export const vehStateAdapter: EntityAdapter<IRouteVeh> = createEntityAdapter<IRouteVeh>({
    selectId: (bus: IRouteVeh) => bus.ROUTE_CODE
});

export const inititialIRouteVehState: IRouteVehState = vehStateAdapter.getInitialState({
    selectedBus: ''
});