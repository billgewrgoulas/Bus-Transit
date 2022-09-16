import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IBus{
    VEH_NO: string;
    CS_DATE: string;
    CS_LAT: string;
    CS_LNG: string;
    ROUTE_CODE: string;
}

export interface BusState extends EntityState<IBus>{};

export const busStateAdapter: EntityAdapter<IBus> = createEntityAdapter<IBus>({
    selectId: (bus: IBus) => bus.VEH_NO
});

export const inititialBusState: BusState = busStateAdapter.getInitialState({});