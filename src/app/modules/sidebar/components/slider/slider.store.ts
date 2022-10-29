import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { filter, Observable, switchMap, takeUntil, timer } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { IArrival } from "src/app/state/entities/live.data";

export interface SliderState {
    arrivals: IArrival[];
}
  
@Injectable()
export class SliderStore extends ComponentStore<SliderState> {

    public arrivals$: Observable<IArrival[]> = this.select(state => state.arrivals);
    
    public constructor(private dataService: DataService) {
        super({arrivals: []});
    }

    public updateArrivals = this.updater((state, arrivals: IArrival[]) =>{
        return {arrivals: [...state.arrivals, ...arrivals]};
    });

    public fetchArrivals = this.effect((code$: Observable<string>) =>{
        return code$.pipe(
            switchMap((code)=> timer(0, 2000).pipe(
                switchMap(() => this.dataService.getStopArrivals(code)),
                tapResponse(
                    (arrivals) => this.updateArrivals(arrivals),
                    (error: HttpErrorResponse) => console.log(error)
                )
            )),
            filter((res: IArrival[]) => !!res),
        )
    });
}