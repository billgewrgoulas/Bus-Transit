import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { DirectionsStore } from 'src/app/modules/planner/state/directions.store';
import { IStop } from 'src/app/state/Entities/stop.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getAllStops, getSavedStops } from 'src/app/state/Selectors/appState.selectors';
import * as nav_actions from '../../../../state/Actions/navigation.actions';
import * as api_actions from '../../../../state/Actions/api-calls.actions';


@Component({
  selector: 'stop-dropdown',
  templateUrl: './stop-drop-down.component.html',
  styleUrls: ['./stop-drop-down.component.css'],

})
export class StopDropDownComponent implements OnInit {

  public stops$!: Observable<IStop[]>;
  public searchText$!: Observable<string>;
  
  @Input() public flag: boolean = true;
  @Input() public saved: boolean = false;
  
  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService, 
    private router: Router, 
    private local: DirectionsStore
  ) { }

  ngOnInit(): void {

    this.searchText$ = this.local.getText();
    this.msg.selectEndpoint(this.local.state$);

    if(this.saved){
      this.stops$ = this.store.select(getSavedStops);
    }else{
      this.stops$ = this.store.select(getAllStops);
    }
    
  }

  public onSave(code: string){
    this.store.dispatch(api_actions.saveStop({code: code}));
  }

  public onRemove(code: string){
    this.store.dispatch(api_actions.deleteStop({code: code}));
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
    if(window.innerWidth <= 500){
      this.store.dispatch(nav_actions.placesMap());
      setTimeout(() => this.msg.selectEndpoint(this.local.state$), 0);
    }
    this.local.updatePoint(data);
  }

  private getPosition(): Promise<any>{
    return new Promise((resolve, reject) => {

      if(navigator && navigator.geolocation){
        navigator.geolocation.getCurrentPosition(resolve);
      }else{
        confirm("Can't access device location");
        reject('Geolocation not supported');
      }

    });
  }

}
