import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface ISchedule{
    sdc_code: string;
    line_code: string;
    start_times: string[];
    end_times: string[];
}

export interface ScheduleState extends EntityState<ISchedule>{
    selectedSched: string;
};

export const scheduleStateAdapter: EntityAdapter<ISchedule> = createEntityAdapter<ISchedule>({
    selectId: (sch: ISchedule) => sch.line_code + '-' + sch.sdc_code
});

export const initialSchedulelState: ScheduleState = scheduleStateAdapter.getInitialState({
    selectedSched: ''
});