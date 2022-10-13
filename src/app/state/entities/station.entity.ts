import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IStatus{
    RouteCode: string;
    BusCode: string;
    on: string;
    off: string;
}

export interface IStation{
    StopCode: string;
    StopDescr: string;
    StopHeading: string;
    StopLat: string;
    StopLng: string;
    Booked: boolean;
    RouteStopOrder: string;
    status: IStatus[];
}

export interface StationState extends EntityState<IStation>{
    activeStationId: string,
};

export const stationStateAdapter: EntityAdapter<IStation> = createEntityAdapter<IStation>({
    selectId: (stop: IStation) => stop.StopCode
});

export const inititialStationState: StationState = stationStateAdapter.getInitialState({
    activeStationId: '',
});