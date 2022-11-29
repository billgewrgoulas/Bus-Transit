import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { Plan } from 'src/app/state/Entities/itinerary';
import { DirectionsStore, TripState } from 'src/app/state/LocalStore/directions.store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getPlanState } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'trip-planner-options',
  templateUrl: './trip-planner-options.component.html',
  styleUrls: ['./trip-planner-options.component.css'],
})
export class TripPlannerOptionsComponent implements OnInit {

  public tripOptions!: FormGroup;
  public state$!: Observable<TripState>;
  public date!: FormControl<Date | null>;
  public time!: FormControl<string | null>;

  constructor(private local: DirectionsStore, private router: Router) { }

  ngOnInit(): void {

    this.local.updateStrategy('trip_planner');
    this.local.fetchPlan();

    this.state$ = this.local.state$.pipe(take(1), tap(state => {
      this.tripOptions = new FormGroup({
        date: new FormControl(state.date, [Validators.required]),
        time: new FormControl(state.time, [Validators.required]),
      });
    }));

  }

  public updateDate(event: MatDatepickerInputEvent<Date>){
    this.local.updateDate(event.value!);
  }

  public updateTime(e: any){
    this.local.updateTime(e.target.value);
  }

  public updateSelect(value: string){
    this.local.updateArriveBy(value);
  }

  public plan(start: string[], end: string[]){

    if(this.tripOptions.valid && start.length > 0 && end.length > 0){
      this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trips'] }}], 
        {queryParams: {module: 'trips'}
      });
    }
    
  }

}

