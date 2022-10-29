import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { filter, Observable, switchMap, takeUntil, timer } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { IArrival, IBus } from "src/app/state/entities/live.data";
import { IStop } from "../entities/stop.entity";
import { AppState } from "../reducers/api-reducer";
import { currentRoute, getActiveStop } from "../selectors/appState.selectors";

export interface LiveState {
    arrivals: IArrival[];
    buses: IBus[];
}

export const initialState: LiveState = {
    arrivals: [],
    buses: []
}
  
@Injectable()
export class LiveDataStore extends ComponentStore<LiveState> {
    
    public constructor(private dataService: DataService, private store: Store<AppState>) {
        super(initialState);
    }

    /* Select the stop arrivals for the current route */
    public getStopArrivals(){
        return this.select(this.store.select(currentRoute), this.getArrivalState(),
            (route, arrivals) => {
                if(route){
                    return arrivals.filter((arrival) => arrival.routeCode === route.code);
                }else{
                    return [];
                }
            }
        );
    }

    /* Fetch the stop arrivals every 15secs and update the local state */
    public fetchArrivals = this.effect((code$: Observable<IStop | undefined>) =>{
        return code$.pipe(
            filter((stop) => !!stop),
            switchMap((stop)=> timer(0, 10000).pipe(
                switchMap(() => this.dataService.getStopArrivals(stop!.code)),
                tapResponse(
                    (arrivals) => this.updateArrivals(arrivals),
                    (error: HttpErrorResponse) => console.log(error)
                )
            ))
        );
    });

    private updateArrivals = this.updater((state, arrivals: IArrival[]) => {
        return {arrivals: [...arrivals], buses: []};
    });

    private getArrivalState(): Observable<IArrival[]>{
        return this.select(state => state.arrivals);
    }
}