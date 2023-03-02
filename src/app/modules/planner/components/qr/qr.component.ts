import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Booking } from 'src/app/state/Entities/booking.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { Store } from '@ngrx/store';
import { getACtiveBooking, spinner } from 'src/app/state/Selectors/appState.selectors';

interface QRLocal{
  booking: Booking | undefined;
  spinner: boolean;
}

@Component({
  selector: 'qr-component',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css'],
})
export class QrComponent implements OnInit {

  public vm$!: Observable<QRLocal>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.vm$ = combineLatest([
      this.store.select(spinner),
      this.store.select(getACtiveBooking)
    ]).pipe(map(([spinner, booking]) => ({spinner, booking})));
  }

  public data(booking: Booking){
    return `${booking.user_id}_${booking.trip_id}_${booking.date}`;
  }

}
