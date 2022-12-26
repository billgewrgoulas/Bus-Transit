import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookingState, BookingsStore } from '../../state/bookings.store';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/state/Entities/booking.entity';
import { DirectionsStore, TripState } from '../../state/directions.store';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bookings-component',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [BookingsStore]
})
export class BookingsComponent implements OnInit {

  public bookings$!: Observable<Booking[]>;
  public state$!: Observable<BookingState>;

  constructor(
    private local: BookingsStore, 
    private directionsStore: DirectionsStore,
    private msg: DataShareService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookings$ = this.local.getBookings();
    this.local.fetchBookings();
    this.local.initFetch();
    this.local.fetchPlan();
    this.msg.clearLayers();
    this.directionsStore.reset();
    this.msg.selectEndpoint(this.directionsStore.state$);
    this.state$ = this.local.state$;
  }

  public onCancel(index: number){
    this.local.changeDelete(index);
  }

  public onMap(booking: Booking){
    this.directionsStore.updateStart([booking.startStop, booking.start, '0', '0']);
    this.directionsStore.updateEnd([booking.endStop, booking.end, '0', '0']); //use interface
    this.local.changeSelcted(booking);
  }

  public filter(value: string){
    this.bookings$ = this.local.filter(value);
  }

  public showQR(booking: Booking){
    this.router.navigate([{ outlets: 
      { sidebar: ['routes', 'booking', 'qr'] }}], 
      {queryParams: {module: 'trip_options'}
    });
  }
  
  public tripPlanner(): void{
    this.router.navigate([{ outlets: 
      { sidebar: [ 'routes', 'trip', 'options'] }}], 
      {queryParams: {module: 'trip_options'}
    });
  }

}
