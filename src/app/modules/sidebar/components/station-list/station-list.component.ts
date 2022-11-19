import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { currentRoute, getRouteStops } from 'src/app/state/Selectors/appState.selectors';
import { IStop } from 'src/app/state/Entities/stop.entity';
import { IRoute } from 'src/app/state/Entities/route.entity';

@Component({
  selector: 'station-list-component',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css'],
})
export class StationListComponent implements OnInit, AfterViewInit, OnChanges {

  public currentRouteStops$!: Observable<IStop[]>;
  public currentRoute$!: Observable<IRoute | undefined>;
  public selectedDay: number = 0;
  private el: any;
  private scrollPosition: number = 0;
  
  @ViewChild('stationList') stationList: any;
  @Input() public onSwap: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.el) return;
    setTimeout(() => this.el.scrollTop = this.scrollPosition, 100);
  }

  ngAfterViewInit(): void {
    this.el = this.stationList.nativeElement;
  }

  ngOnInit(): void {
    this.currentRouteStops$ = this.store.select(getRouteStops);
    this.currentRoute$ = this.store.select(currentRoute);
  }

  public onScroll($e: any){
    this.scrollPosition = this.el.scrollTop;
  }

}
