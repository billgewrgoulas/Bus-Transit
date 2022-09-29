import { Injectable } from '@angular/core';
import { AsyncSubject, ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  /* change the active tab on the route slider */
  private tab = new Subject<number>;
  tabObserver = this.tab.asObservable();

  public slide(tab: number) {
    this.tab.next(tab);
  }


}
