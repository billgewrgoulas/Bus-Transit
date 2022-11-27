import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Itinerary } from 'src/app/state/Entities/itinerary';

@Component({
  selector: 'trip-component',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  @Input() public startTime: string = '';
  @Input() public endTime: string = '';
  @Input() public duration: number = 0;
  @Input() public totalWalk: number = 0;
  @Input() public data: number = 0;
  @Input() public itinerary: Itinerary | null = null;

  @Output() public msg = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public onSelect(){
    this.msg.emit(this.data);
  }

}
