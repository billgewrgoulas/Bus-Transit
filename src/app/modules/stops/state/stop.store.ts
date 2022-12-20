import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { filter, Observable, switchMap, takeUntil, tap, timer } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { IArrival } from "src/app/state/Entities/live.data";
import { ILine } from "../../../state/Entities/line.entity";
import { IStop } from "../../../state/Entities/stop.entity";
import { AppState } from "../../../state/Reducers/api-reducer";
import { currentRoute, getActiveStop } from "../../../state/Selectors/appState.selectors";

export interface LiveState {
    arrivals: IArrival[];
}

export const initialState: LiveState = {
    arrivals: [],
}
  
@Injectable()
export class StopsStore extends ComponentStore<LiveState> {
    
    public constructor(private dataService: DataService, private store: Store<AppState>) {
        super(initialState);
    }

    public getArrivalState(): Observable<IArrival[]>{
        return this.select(state => state.arrivals);
    }

    /* Fetch the stop arrivals every 20secs and update the local state */
    public fetchArrivals = this.effect((stop$: Observable<IStop | undefined>) =>{
        return stop$.pipe(
            filter((stop) => !!stop),
            switchMap((stop)=> timer(0, 20000).pipe(
                switchMap(() => this.dataService.getLiveUpdates(stop!.code, 'stops/')),
                tapResponse(
                    (arrivals) => this.updateArrivals(arrivals),
                    (error: HttpErrorResponse) => console.log(error)
                )
            ))
        );
    });

    /* STATE UPDATERS */
    private updateArrivals = this.updater((state, arrivals: IArrival[]): LiveState => {
        return {arrivals: [...arrivals]};
    });

}