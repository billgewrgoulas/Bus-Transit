import { Component, Input, OnInit } from '@angular/core';
import { Itinerary } from 'src/app/state/Entities/itinerary';

@Component({
  selector: 'trip-component',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  @Input() public startTime: string = '';
  @Input() public endTime: string = '';
  @Input() public itineraries: Itinerary[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
