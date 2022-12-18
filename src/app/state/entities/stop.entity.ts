import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IStop{
    id: string;
    code: string;
    latitude: string;
    longitude: string;
    desc: string;
    desc_eng: string;
    lines: string;
}

export interface StopState extends EntityState<IStop>{
    activeStopCode: string,
};

export const stopStateAdapter: EntityAdapter<IStop> = createEntityAdapter<IStop>({
    selectId: (stop: IStop) => stop.code
});

export const inititialStopState: StopState = stopStateAdapter.getInitialState({
    activeStopCode: '',
});