import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { ILine } from "./dataInterfaces";


export const lineStateAdapter: EntityAdapter<ILine> = createEntityAdapter<ILine>({
    selectId: (line: ILine)=> line.line_code
});

export interface LineState extends EntityState<ILine>{activeLine: string};
export const inititialLineState: LineState = lineStateAdapter.getInitialState({activeLine: ''});

