import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { DirectionsStore, TripState } from 'src/app/state/LocalStore/directions.store';

@Component({
  selector: 'trip-planner-options',
  templateUrl: './trip-planner-options.component.html',
  styleUrls: ['./trip-planner-options.component.css'],
})
export class TripPlannerOptionsComponent implements OnInit {

  public tripOptions!: FormGroup;
  public state$!: Observable<TripState>;
  public date: any;

  constructor(private local: DirectionsStore) { }

  ngOnInit(): void {

    this.local.updateStrategy('trip_planner');
    this.local.fetchPlan();
    this.state$ = this.local.state$;

    this.tripOptions = new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });

  }

  public updateDate(event: MatDatepickerInputEvent<Date>){
    this.local.updateDate(event.value?.toString());
  }

  public updateTime(e: any){
    this.local.updateTime(e.target.value);
  }

  public updateSelect(type: string, value: string){
    if(type == 'direction'){
      this.local.updateArriveBy(value);
    }else if (type == 'mode'){
      this.local.updateMode(value);
    }else if (type == 'sortBy'){
      this.local.updateSortBy(value);
    }
  }

  public plan(){

    if(this.tripOptions.valid){
      this.local.initFetch();
    }
    
  }

}
