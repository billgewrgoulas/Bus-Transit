import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IStation } from "./dataInterfaces";


export interface StationState extends EntityState<IStation>{
    activeStationId: string
};

export const lineStateAdapter: EntityAdapter<IStation> = createEntityAdapter<IStation>({
    selectId: (station: IStation)=> station.stationCode
});

export const inititialLineState: StationState = lineStateAdapter.getInitialState({
    activeStationId: '',
});