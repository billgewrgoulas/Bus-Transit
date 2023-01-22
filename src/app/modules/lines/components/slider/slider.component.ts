import { Component, OnInit } from '@angular/core';
import { LiveDataStore, LiveState } from '../../state/live.data.store';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'slider-component',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {

  public selectedTab: number = 0;
  public vm$!: Observable<LiveState>;
  
  constructor(
    private localStore: LiveDataStore, 
    private msg: DataShareService
  ) { }

  ngOnInit(): void {

    this.vm$ = combineLatest([
      this.localStore.getBusLocations(),
      this.localStore.getStopArrivals()
    ]).pipe(
      map(([buses, arrivals]) => ({buses, arrivals})), 
      tap(({buses, arrivals}) => this.msg.sendBusStatus(buses))
    );

  }

  public slide(tab: number){
    this.selectedTab = tab;
  }
  
}
