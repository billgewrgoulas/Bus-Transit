import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface ILine{
    id: number;
    name: string;
    routesNumber: string;
    desc: string;
    desc_eng: string;
    routeCodes: string[];
}

export interface LineState extends EntityState<ILine>{
    activeLineId: string,
};

export const lineStateAdapter: EntityAdapter<ILine> = createEntityAdapter<ILine>({
    selectId: (line: ILine)=> line.id
});

export const inititialLineState: LineState = lineStateAdapter.getInitialState({
    activeLineId: '',
});