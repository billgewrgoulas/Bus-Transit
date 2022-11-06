import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface ISchedule{
    id: number;
    day: number;
    routeCode: string;
    stopCode: string;
    line: string;
    tripTime: string;
    tripTimeHour: number;
    tripTimeMinute: number;
}

export interface IScheduleDetails{
    schedules: ISchedule[];
    routeCode: string;
}

export interface ScheduleState extends EntityState<IScheduleDetails>{};

export const scheduleStateAdapter: EntityAdapter<IScheduleDetails> = createEntityAdapter<IScheduleDetails>({
    selectId: (schedule)=> schedule.routeCode
});

export const inititialSchdeduleState: ScheduleState = scheduleStateAdapter.getInitialState();