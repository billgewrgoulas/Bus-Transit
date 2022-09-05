import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IArrival} from "./dataInterfaces";


export interface ArrivalState extends EntityState<IArrival>{
    activatedStations: string[]
};

export const arrivalStateAdapter: EntityAdapter<IArrival> = createEntityAdapter<IArrival>({
    selectId: (arrival: IArrival)=> arrival.stationCode
});

export const initialArrivalState: ArrivalState = arrivalStateAdapter.getInitialState({
    activatedStations: [],
});