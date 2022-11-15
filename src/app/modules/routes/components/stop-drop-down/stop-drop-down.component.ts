import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, Observable, Subscription, switchMap } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { DataService } from 'src/app/services/data.service';
import { DirectionsStore, TripState } from 'src/app/state/componentStore/directions.store';
import { IStop } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { filterStops } from 'src/app/state/selectors/appState.selectors';

@Component({
  selector: 'stop-dropdown',
  templateUrl: './stop-drop-down.component.html',
  styleUrls: ['./stop-drop-down.component.css'],

})
export class StopDropDownComponent implements OnInit {

  public stops$!: Observable<IStop[]>;
  public showDefaultSwitch$!: Observable<boolean>;
  
  @Input() public flag: boolean = true;

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService, 
    private router: Router, 
    private local: DirectionsStore
  ) { }

  ngOnInit(): void {
    this.showDefaultSwitch$ = this.msg.stopListObserver;
    this.stops$ = this.msg.startValueMsg.pipe(
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(v => this.store.select(filterStops(v)))
    );
  }

  public onClick(data: string[]){
    this.local.updatePoint(data);
    this.msg.selectEndpoint(data);
  }

  public navigate(data: string[]){
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'saved'] }}]);
  }

  public onCalculate(){
    //this.router.navigate([{ outlets: { sidebar: [ 'routes', 'route'] }}]);
  }

}
