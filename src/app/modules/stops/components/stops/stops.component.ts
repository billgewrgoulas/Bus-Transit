import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { IStop } from 'src/app/state/Entities/stop.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { filterStops } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'stops-component',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.css']
})
export class StopsComponent implements OnInit {

  public stops$!: Observable<IStop[]>;

  constructor(
    private store: Store<AppState>, 
    private router: Router,
    private msg: DataShareService
  ) { }

  ngOnInit(): void {
    this.stops$ = this.store.select(filterStops(''));
    this.msg.clearLayers();
  }

  public onSelect(stopCode: string){
    this.router.navigate([{ outlets: { sidebar: [ 'stops', stopCode ] }}], {queryParams: {module: 'stop_data'}});
  }

  public filter(value: string){
    this.stops$ = this.store.select(filterStops(value));
  }

  public mentos(stop: IStop | undefined){

    if(stop && stop.lines){
      return stop.lines.split(',');
    }

    return [];
  }

}
