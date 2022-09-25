import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IStation{
    StopCode: string;
    StopDescr: string;
    StopHeading: string;
    StopLat: number;
    StopLng: number;
    RouteStopOrder: string;
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