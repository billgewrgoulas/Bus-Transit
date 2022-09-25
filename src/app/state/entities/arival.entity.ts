import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IArrivalDetails{
    route_code: string;
    stop_code: string;
    veh_code: string;
    btime2: string;
}

export interface IArrival{
    stop_code: string;
    arrivalDetails: IArrivalDetails[];
}

export interface ArrivalState extends EntityState<IArrival>{};

export const arrivalStateAdapter: EntityAdapter<IArrival> = createEntityAdapter<IArrival>({
    selectId: (arrival: IArrival)=> arrival.stop_code
});

export const initialArrivalState: ArrivalState = arrivalStateAdapter.getInitialState({});