import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { ILine } from "./dataInterfaces";


export interface LineState extends EntityState<ILine>{
    activeLineId: string, 
    activeStops: string[]
};

export const lineStateAdapter: EntityAdapter<ILine> = createEntityAdapter<ILine>({
    selectId: (line: ILine)=> line.line_code
});

export const inititialLineState: LineState = lineStateAdapter.getInitialState({
    activeLineId: '',
    activeStops: []
});