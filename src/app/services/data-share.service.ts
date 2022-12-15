import { Injectable } from '@angular/core';
import { AsyncSubject, ReplaySubject, Subject, BehaviorSubject, Observable, take} from 'rxjs';
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
  private readonly searchValue = new BehaviorSubject<string>('');
  private readonly dragStart = new Subject<string[]>;
  private readonly dragEnd = new Subject<string[]>;
  private readonly clearMap = new Subject<number>;
  private readonly toggle = new Subject<void>();
  private readonly removeDrag = new Subject<void>();

  public readonly tabObserver = this.tab.asObservable();
  public readonly busObserver = this.bus.asObservable();
  public readonly pointObserver = this.point.asObservable();
  public readonly markerObserver = this.marker.asObservable();
  public readonly dayObserver = this.day.asObservable();
  public readonly stopListObserver = this.stopDefaultList.asObservable();
  public readonly searchValueMsg = this.searchValue.asObservable();
  public readonly dragStartObserver= this.dragStart.asObservable();
  public readonly dragEndObserver = this.dragEnd.asObservable();
  public readonly clearMapObserver = this.clearMap.asObservable();
  public readonly toggleObserver = this.toggle.asObservable();
  public readonly removeDragObserver = this.removeDrag.asObservable();
  
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
    this.searchValue.next(v);
  }

  public onDragStart(value: string[]){
    this.dragStart.next(value);
  }

  public onDragEnd(value: string[]){
    this.dragEnd.next(value);
  }

  public clearLayers(){
    this.clearMap.next(0);
  }

  public onToggle(){
    this.toggle.next();
  }

  public dragOff(){
    this.removeDrag.next();
  }

}
