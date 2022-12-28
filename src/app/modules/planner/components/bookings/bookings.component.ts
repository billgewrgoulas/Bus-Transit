import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookingState, BookingsStore } from '../../state/bookings.store';
import { Observable, combineLatest, map } from 'rxjs';
import { Booking } from 'src/app/state/Entities/booking.entity';
import { DirectionsStore, TripState } from '../../state/directions.store';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { Store } from '@ngrx/store';
import { filterBookings, spinner } from 'src/app/state/Selectors/appState.selectors';
import { getItinerary } from 'src/app/state/Actions/api-calls.actions';

@Component({
  selector: 'bookings-component',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [BookingsStore]
})
export class BookingsComponent implements OnInit {

  public vm$!: Observable<any>;
  public state$!: Observable<BookingState>;

  constructor(
    private local: BookingsStore, 
    private directionsStore: DirectionsStore,
    private msg: DataShareService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.vm$ = combineLatest([
      this.store.select(filterBookings('')), 
      this.store.select(spinner),
      this.local.state$
    ]).pipe(map(([bookings, spinner, state]) => ({bookings, spinner, state})));
    

    this.msg.clearLayers();
    this.directionsStore.reset();
    this.msg.selectEndpoint(this.directionsStore.state$);
    this.state$ = this.local.state$;
  }

  public onCancel(trip_id: number){
    this.local.changeDelete(trip_id);
  }

  public onMap(booking: Booking){
    this.directionsStore.updateStart([booking.startStop, booking.start, '0', '0']);
    this.directionsStore.updateEnd([booking.endStop, booking.end, '0', '0']);
    this.store.dispatch(getItinerary({data: booking}));
    this.navigate([ 'routes', 'trips', 0], 'trip_details');
  }

  public filter(value: string){
    //this.bookings$ = this.local.filter(value);
  }

  public showQR(booking: Booking){
    this.navigate(['routes', 'booking', 'qr', booking.trip_id], 'qr_module');
  }
  
  public tripPlanner(): void{
    this.navigate(['routes', 'trip', 'options'], 'trip_options');
  }

  private navigate(link: any[], module: string){
    this.router.navigate([{ outlets: 
      { sidebar:  link}}], 
      {queryParams: {module: module}
    });
  }

}
