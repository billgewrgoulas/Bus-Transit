import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface IMlInfo{
    sdc_descr: string;
    sdc_descr_eng: string;
    sdc_code: string;
}

export interface IMLineState extends EntityState<IMlInfo>{};

export const mLStateAdapter: EntityAdapter<IMlInfo> = createEntityAdapter<IMlInfo>({
    selectId: (mLine: IMlInfo) => mLine.sdc_code
});

export const inititialMLineState: IMLineState = mLStateAdapter.getInitialState({});