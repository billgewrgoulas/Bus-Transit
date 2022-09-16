import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface ILine{
    sdc_code: string;
    line_code: string;
    line_id: string;
    line_decr: string;
    line_descr: string;
    routeCodes: string[];
}

export interface LineState extends EntityState<ILine>{
    activeLineId: string,
};

export const lineStateAdapter: EntityAdapter<ILine> = createEntityAdapter<ILine>({
    selectId: (line: ILine)=> line.line_code
});

export const inititialLineState: LineState = lineStateAdapter.getInitialState({
    activeLineId: '',
});