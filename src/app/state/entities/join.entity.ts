import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IJoin{
    routeCode: string;
    stopCode: string;
}

export interface JoinState extends EntityState<IJoin>{};
export const joinStateAdapter: EntityAdapter<IJoin> = createEntityAdapter<IJoin>({});
export const inititialJoinState: JoinState = joinStateAdapter.getInitialState({});