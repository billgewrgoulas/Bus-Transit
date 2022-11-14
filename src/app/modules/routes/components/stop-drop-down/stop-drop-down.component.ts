import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { DataService } from 'src/app/services/data.service';
import { IStop } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { filterStops } from 'src/app/state/selectors/appState.selectors';

@Component({
  selector: 'stop-dropdown',
  templateUrl: './stop-drop-down.component.html',
  styleUrls: ['./stop-drop-down.component.css']
})
export class StopDropDownComponent implements OnInit {

  public stops$!: Observable<IStop[]>;
  public showDefaultSwitch$!: Observable<boolean>;
  
  @Input() public flag: boolean = true;

  constructor(private store: Store<AppState>, private msg: DataShareService, private router: Router) { }

  ngOnInit(): void {
    this.stops$ = this.store.select(filterStops(''));
    this.showDefaultSwitch$ = this.msg.stopListObserver;
  }

  public onClick(data: string[]){
    this.msg.selectEndpoint(data);
  }

  public navigate(data: string[]){
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'saved'] }}]);
  }

  public onCalculate(){
    this.msg.startCalculation('path');
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'route'] }}]);
  }

}
