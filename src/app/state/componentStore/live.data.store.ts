import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { filter, Observable, switchMap, takeUntil, timer } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { IArrival } from "src/app/state/entities/live.data";
import { ILine } from "../entities/line.entity";
import { IStop } from "../entities/stop.entity";
import { AppState } from "../reducers/api-reducer";
import { currentRoute, getActiveStop } from "../selectors/appState.selectors";

export interface LiveState {
    arrivals: IArrival[];
    buses: IArrival[];
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

    /* Select the Buses for the current route */
    public getBusLocations(){
        return this.select(this.store.select(currentRoute), this.getBusState(), 
            (route, buses) => {
                if(route){
                    return buses.filter((bus) => bus.routeCode === route.code);
                }else{
                    return [];
                }
            }
        );
    }

    /* Fetch the stop arrivals every 10secs and update the local state */
    public fetchArrivals = this.effect((stop$: Observable<IStop | undefined>) =>{
        return stop$.pipe(
            filter((stop) => !!stop),
            switchMap((stop)=> timer(0, 10000).pipe(
                switchMap(() => this.dataService.getLiveUpdates(stop!.code, 'stops/')),
                tapResponse(
                    (arrivals) => this.updateArrivals(arrivals),
                    (error: HttpErrorResponse) => console.log(error)
                )
            ))
        );
    });

    /* Fetch the bus locations every 15secs and update the local state */
    public fetchBusLocations = this.effect((line$: Observable<ILine | undefined>) =>{
        return line$.pipe(
            filter((line) => !!line),
            switchMap((line)=> timer(0, 15000).pipe(
                switchMap(() => this.dataService.getLiveUpdates(line!.name, 'lines/')),
                tapResponse(
                    (buses) => this.updateBuses(buses),
                    (error: HttpErrorResponse) => console.log(error)
                )
            ))
        );
    });

    /* STATE UPDATERS */
    private updateArrivals = this.updater((state, arrivals: IArrival[]): LiveState => {
        return {arrivals: [...arrivals], buses: []};
    });

    private updateBuses = this.updater((state, buses: IArrival[]): LiveState => {
        console.log(buses);
        return {buses: [...buses], arrivals: [...state.arrivals]};
    });

    /* STATE SELECTORS */
    private getArrivalState(): Observable<IArrival[]>{
        return this.select(state => state.arrivals);
    }

    private getBusState(): Observable<IArrival[]>{
        return this.select(state => state.buses);
    }

}