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
  @Output() public map = new EventEmitter<Booking>();
  @Output() public qr = new EventEmitter<Booking>();

  constructor() { }

  ngOnInit(): void { }

  public onMap(){
    this.map.emit(this.booking);
  }

  public onCancel(){
    this.cancel.emit(this.index);
  }

  public onQR(){
    this.qr.next(this.booking);
  }

}
