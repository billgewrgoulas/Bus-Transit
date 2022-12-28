import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, tap } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import * as navigation from '../../../../state/Actions/navigation.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectionsStore } from 'src/app/modules/planner/state/directions.store';
import * as select_actions from '../../../../state/Actions/select.actions';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {

  public obs$!: Observable<any>;
  public disabled: boolean = false;

  constructor(
    private local: DirectionsStore,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.obs$ = this.local.getNames();
  }

  public swap(){
    this.local.swapPoints();
  }

  public places(dest: string){
    this.router.navigate([{ outlets: 
      { sidebar: [ 'routes', 'places', dest] }}], 
      {queryParams: {module: 'places'}
    });
  }

  public checkUrl(){
    const url: string = this.router.url;
    if(url == '/(sidebar:routes/trips)?module=trips'){
      this.disabled = true;
    }else if(url == '/(sidebar:routes/trips/0)?module=trip_details'){
      this.disabled = true;
    }else{
      this.disabled = false;
    }
  }

}
