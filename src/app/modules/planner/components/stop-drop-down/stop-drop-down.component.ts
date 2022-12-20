import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, Observable, Subscription, switchMap, take } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { DataService } from 'src/app/services/data.service';
import { DirectionsStore, TripState } from 'src/app/modules/planner/state/directions.store';
import { IStop } from 'src/app/state/Entities/stop.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { filterStops } from 'src/app/state/Selectors/appState.selectors';
import * as nav_actions from '../../../../state/Actions/navigation.actions';

@Component({
  selector: 'stop-dropdown',
  templateUrl: './stop-drop-down.component.html',
  styleUrls: ['./stop-drop-down.component.css'],

})
export class StopDropDownComponent implements OnInit, OnChanges {

  public stops$!: Observable<IStop[]>;
  
  @Input() public flag: boolean = true;
  @Input() public saved: boolean = false;
  @Input() public value: string = '';

  @Output() public custom = new EventEmitter<string>();

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService, 
    private router: Router, 
    private local: DirectionsStore
  ) { }

  ngOnInit(): void {
    this.msg.selectEndpoint(this.local.state$);
  }

  ngOnChanges(): void{
    this.stops$ = this.store.select(filterStops(this.value)).pipe(
      debounceTime(10), distinctUntilChanged()
    );
  }

  public onClick(data: string[]){
    this.local.updatePoint(data);
    this.store.dispatch(nav_actions.arrowNavigation());
  }

  public async onLocation(data: string[]){
    const {coords} = await this.getPosition();
    this.local.updatePoint([1, 'My location', coords.latitude, coords.longitude]);
    this.store.dispatch(nav_actions.arrowNavigation());
  }

  public tripPlanner(){
    this.local.changeDirection('');
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trip', 'options'] }}], {queryParams: {module: 'trip_options'}});
  }

  public onMap(data: string[]){
    this.local.updatePoint(data);
    this.custom.next('Custom');
  }

  private getPosition(): Promise<any>{
    return new Promise((resolve, reject) => {

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(resolve);
      }else{
        confirm("Can't access device location");
        reject('Geolocation not supported');
      }

    });
  }

}
