import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { filter, Observable, switchMap, takeUntil, tap, timer } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { IArrival } from "src/app/state/Entities/live.data";
import { IStop } from "../../../state/Entities/stop.entity";
import { AppState } from "../../../state/Reducers/api-reducer";
import { getACtiveBooking } from "src/app/state/Selectors/appState.selectors";

export interface LiveState {
    arrivals: IArrival[];
}

export const initialState: LiveState = {
    arrivals: [],
}
  
@Injectable()
export class OriginStore extends ComponentStore<LiveState> {
    
    public constructor(private dataService: DataService, private store: Store<AppState>) {
        super(initialState);
    }

    public getArrivalState(): Observable<IArrival[]>{
        return this.select(this.store.select(getACtiveBooking), this.state$, (b, s) => {
            return s.arrivals.filter(s => s.routeCode == b?.route);
        });
    }

    /* Fetch the stop arrivals every 30secs and update the local state */
    public fetchArrivals = this.effect((stop$: Observable<IStop | undefined>) =>{
        return stop$.pipe(
            filter((stop) => !!stop),
            switchMap((stop)=> timer(0, 30000).pipe(
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