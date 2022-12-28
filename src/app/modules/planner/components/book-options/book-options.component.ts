import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/Reducers/api-reducer';


@Component({
  selector: 'book-options',
  templateUrl: './book-options.component.html',
  styleUrls: ['./book-options.component.css']
})
export class BookOptionsComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {}

  public myBookings(data: any): void{
    this.router.navigate([{ outlets: 
      { sidebar: [ 'routes', 'bookings'] }}], 
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
