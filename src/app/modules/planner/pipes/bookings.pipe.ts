import { Pipe, PipeTransform } from "@angular/core";
import { Booking } from "src/app/state/Entities/booking.entity";

@Pipe({ name: 'bookings' })
export class BookingPipe implements PipeTransform {

  public transform(data: Booking[], value: string) {

    if(!data){
      return [];
    }

    const upper: string = value.toUpperCase();
    return data.filter((b: Booking) => 
        b.start.toUpperCase().includes(upper) || 
        b.end.includes(value) ||
        b.route.includes(value)
    ).slice(0, 20);
  }

}