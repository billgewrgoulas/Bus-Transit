import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { currentLine, currentRoute, getRouteStops } from 'src/app/state/selectors/appState.selectors';
import { IStop } from 'src/app/state/entities/stop.entity';
import { LiveDataStore } from 'src/app/state/componentStore/live.data.store';
import { IArrival } from 'src/app/state/entities/live.data';
import { ILine } from 'src/app/state/entities/line.entity';
import { DataShareService } from 'src/app/services/data-share.service';
import { IRoute } from 'src/app/state/entities/route.entity';

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
