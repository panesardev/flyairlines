import { Injectable } from "@angular/core";
import { DomainService } from "../../shared/services/domain.service";
import { Booking } from "./booking.interface";

@Injectable({ providedIn: 'root' })
export class BookingService extends DomainService<Booking> {
  override domain = 'bookings';  
}
