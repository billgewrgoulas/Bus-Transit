import { Injectable } from '@angular/core';
import { AsyncSubject, ReplaySubject, Subject} from 'rxjs';
import { IArrival } from '../state/entities/live.data';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  /* change the active tab on the route slider */
  private readonly tab = new Subject<number>;
  public readonly tabObserver = this.tab.asObservable();

  public slide(tab: number) {
    this.tab.next(tab);
  }

  /* send the bus locations to the map service */
  private readonly bus = new Subject<IArrival[]>; 
  public readonly busObserver = this.bus.asObservable();

  public sendBusStatus(buses: IArrival[]){
    this.bus.next(buses);
  }

  /* on day select */
  private readonly day = new Subject<number>; 
  public readonly dayObserver = this.day.asObservable();

  public onDaySelect(day: number){
    this.day.next(day);
  }

  /* fly to point */
  private readonly point = new Subject<IArrival>; 
  public readonly pointObserver = this.point.asObservable();

  public fly(bus: IArrival){
    this.point.next(bus);
  }

}
