import { Injectable } from '@angular/core';
import { AsyncSubject, ReplaySubject, Subject, BehaviorSubject} from 'rxjs';
import { IArrival } from '../state/entities/live.data';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private readonly tab = new Subject<number>;
  private readonly bus = new Subject<IArrival[]>; 
  private readonly point = new Subject<string[]>; 
  private readonly marker = new Subject<string[]>; 
  private readonly day = new Subject<number>; 
  private readonly stopDefaultList = new BehaviorSubject<boolean>(true);

  public readonly tabObserver = this.tab.asObservable();
  public readonly busObserver = this.bus.asObservable();
  public readonly pointObserver = this.point.asObservable();
  public readonly markerObserver = this.marker.asObservable();
  public readonly dayObserver = this.day.asObservable();
  public stopListObserver = this.stopDefaultList.asObservable();

  constructor() { }

  public slide(tab: number) {
    this.tab.next(tab);
  }

  public sendBusStatus(buses: IArrival[]){
    this.bus.next(buses);
  }

  public onDaySelect(day: number){
    this.day.next(day);
  }

  public fly(point: string[]){
    this.point.next(point);
  }

  public selectEndpoint(data: string[]){
    this.marker.next(data);
  }

  public showDefault(flag: boolean){
    this.stopDefaultList.next(flag);
  }

}
