import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dir } from 'console';
import { combineLatest, map, Observable, Subscription, take, tap } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
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
  public subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute, 
    private local: DirectionsStore,
    private msg: DataShareService
  ) { }

  ngOnInit(): void {

    this.subs = [
      this.msg.dragStartObserver.subscribe(v => this.onDrag(v, 'start')),
      this.msg.dragEndObserver.subscribe(v => this.onDrag(v, 'dest'))
    ];

    this.vm$ = combineLatest([
      this.route.data, 
      this.local.state$
    ]).pipe(take(1), map(([data, state]) => ({data, state})), tap(v => this.initStore(v.data['type'], v.state)));

  }

  ngOnDestroy(): void {
    this.local.changeDirection('');
    this.msg.dragOff();
  }

  public keyup(value: string){
    console.log('value: ' + value);
    this.value = value;
    if(this.value == ''){
      this.local.updatePoint([]);
    }
  }

  public custom(value: string){
    this.value = value;
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

  private onDrag(point: string[], direction: string){
    this.local.changeDirection(direction);
    this.local.updatePoint(point);
  }

}
