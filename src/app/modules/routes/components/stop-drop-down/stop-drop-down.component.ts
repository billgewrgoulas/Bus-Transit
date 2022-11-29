import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, Observable, Subscription, switchMap, take } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { DataService } from 'src/app/services/data.service';
import { DirectionsStore, TripState } from 'src/app/state/LocalStore/directions.store';
import { IStop } from 'src/app/state/Entities/stop.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { filterStops } from 'src/app/state/Selectors/appState.selectors';
import * as nav_actions from '../../../../state/Actions/navigation.actions';

@Component({
  selector: 'stop-dropdown',
  templateUrl: './stop-drop-down.component.html',
  styleUrls: ['./stop-drop-down.component.css'],

})
export class StopDropDownComponent implements OnInit {

  public stops$!: Observable<IStop[]>;
  public showDefaultSwitch$!: Observable<boolean>;
  
  @Input() public flag: boolean = true;
  @Input() public saved: boolean = false;

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService, 
    private router: Router, 
    private local: DirectionsStore
  ) { }

  ngOnInit(): void {
    this.showDefaultSwitch$ = this.msg.stopListObserver;
    this.msg.selectEndpoint(this.local.state$);
    this.stops$ = this.msg.searchValueMsg.pipe(
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(v => this.store.select(filterStops(v)))
    );
  }

  public onClick(data: string[]){
    this.local.updatePoint(data);
    this.msg.slide(0);
  }

  public async onLocation(data: string[]){
    const {coords} = await this.getPosition();
    this.local.updatePoint([0, 'My location', coords.latitude, coords.longitude]);
    this.msg.slide(0);
  }

  public tripPlanner(){
    this.local.changeDirection('');
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trip', 'options'] }}], {queryParams: {module: 'trip_options'}});
  }

  public onMap(data: string[]){
    this.local.addOption(data[0]);
  }

  public onCalculate(){
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'search'] }}]);
  }

  private getPosition(): Promise<any>{
    return new Promise((resolve, reject) => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(resolve);
      }else{
        reject('Geolocation not supported');
      }
    });
  }

}
