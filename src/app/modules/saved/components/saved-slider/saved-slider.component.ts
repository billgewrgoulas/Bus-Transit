import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { IStop } from 'src/app/state/Entities/stop.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getSavedInfo, spinner } from 'src/app/state/Selectors/appState.selectors';

interface Saved{
  routes: IRoute[] | undefined,
  stops: IStop[] | undefined,
  spinner: boolean;
}

@Component({
  selector: 'saved-slider',
  templateUrl: './saved-slider.component.html',
  styleUrls: ['./saved-slider.component.css']
})
export class SavedSliderComponent implements OnInit {

  public vm$!: Observable<Saved>;
  public value: string = '';

  constructor(
    private store: Store<AppState>, 
    private router: Router,
    private msg: DataShareService
  ) { }

  ngOnInit(): void {
    this.msg.clearLayers();
    this.vm$ = combineLatest([
      this.store.select(spinner),
      this.store.select(getSavedInfo)
    ]).pipe(map(([spinner, info]) => ({spinner, ...info!})));
  }

  public filter(value: string){
    this.value = value;
  }

  public onStopSelect(code: string[]){
    this.navigate(['stops', code[0]], 'stop_data_saved');
  }

  public onRouteSelect(code: string[]){
    this.navigate(['lines', code[1], 'route', code[0]], 'route_data');
  }

  private navigate(link: string[], module: string){
    this.router.navigate([{ 
      outlets: { sidebar: link }
    }], {queryParams: {module: module}});
  }

}
