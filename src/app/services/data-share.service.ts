import { Injectable } from '@angular/core';
import { AsyncSubject, ReplaySubject, Subject, BehaviorSubject, Observable} from 'rxjs';
import { IArrival } from '../state/Entities/live.data';
import { TripState } from '../state/LocalStore/directions.store';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private readonly tab = new Subject<number>;
  private readonly bus = new Subject<IArrival[]>; 
  private readonly point = new Subject<string[]>; 
  private readonly marker = new Subject<Observable<TripState>>; 
  private readonly day = new Subject<number>; 
  private readonly stopDefaultList = new BehaviorSubject<boolean>(true);
  private readonly startValue = new BehaviorSubject<string>('');

  public readonly tabObserver = this.tab.asObservable();
  public readonly busObserver = this.bus.asObservable();
  public readonly pointObserver = this.point.asObservable();
  public readonly markerObserver = this.marker.asObservable();
  public readonly dayObserver = this.day.asObservable();
  public readonly stopListObserver = this.stopDefaultList.asObservable();
  public readonly startValueMsg = this.startValue.asObservable();
  
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

  public selectEndpoint(obs$: Observable<TripState>){
    this.marker.next(obs$);
  }

  public showDefault(flag: boolean){
    this.stopDefaultList.next(flag);
  }

  public onKeyUp(v: string){
    this.startValue.next(v);
  }

}
