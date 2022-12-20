import { Component, OnInit } from '@angular/core';
import { BookingsStore } from '../../state/bookings.store';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/state/Entities/booking.entity';

@Component({
  selector: 'bookings-component',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [BookingsStore]
})
export class BookingsComponent implements OnInit {

  public bookings$!: Observable<Booking[]>;

  constructor(private local: BookingsStore) { }

  ngOnInit(): void {
    this.bookings$ = this.local.getBookings();
    this.local.fetchBookings();
    this.local.initFetch();
    this.local.fetchPlan();
  }

  public onCancel(index: number){

  }

  public onMap(index: number){
    this.local.resetIndex(index);
  }

}
