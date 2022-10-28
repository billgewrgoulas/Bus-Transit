import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IStop{
    id: number;
    code: string;
    latitude: string;
    longitude: string;
    desc: string;
    desc_eng: string;
}

export interface StopState extends EntityState<IStop>{
    activeStationCode: string,
};

export const stopStateAdapter: EntityAdapter<IStop> = createEntityAdapter<IStop>({
    selectId: (stop: IStop) => stop.code
});

export const inititialStopState: StopState = stopStateAdapter.getInitialState({
    activeStationCode: '',
});