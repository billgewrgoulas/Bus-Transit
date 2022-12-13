import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dir } from 'console';
import { combineLatest, map, Observable, take, tap } from 'rxjs';
import { DirectionsStore, TripState } from 'src/app/state/LocalStore/directions.store';

@Component({
  selector: 'places-component',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit, OnDestroy {

  public value: string = '';
  public direction: string = 'start';
  public vm$!: Observable<any>;

  constructor(private route: ActivatedRoute, private local: DirectionsStore) { }

  ngOnInit(): void {
    this.vm$ = combineLatest([
      this.route.data, 
      this.local.state$
    ]).pipe(take(1), map(([data, state]) => ({data, state})), tap(v => this.initStore(v.data['type'], v.state)));

  }

  ngOnDestroy(): void {
    this.local.changeDirection('');
  }

  public keyup(value: string){
    this.value = value;
    if(this.value == ''){
      this.local.updatePoint([]);
    }
  }

  private initStore(direction: string, state: TripState){
    this.direction = direction;
    this.local.changeDirection(direction);

    if(direction == 'start' && state.start.length > 0){
      this.value = state.start[1];
    }else if(this.direction == 'dest' && state.destination.length > 0){
      this.value = state.destination[1];
    }
  }

}
