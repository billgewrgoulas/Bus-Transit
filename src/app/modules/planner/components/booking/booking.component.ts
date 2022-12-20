import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Booking } from 'src/app/state/Entities/booking.entity';

@Component({
  selector: 'booking-component',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @Input() public booking!: Booking;
  @Input() public index: number = 0;

  @Output() public cancel = new EventEmitter<number>();
  @Output() public map = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  public onMap(){
    this.map.emit(this.index);
  }

  public onCancel(){
    this.cancel.emit(this.index);
  }

}
