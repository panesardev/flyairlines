import { Booking } from "../bookings/booking.interface";

export interface Passenger {
  id?: number;
  booking: Booking
  firstName: string;
  lastName: string;
  email: string;
  passportNumber: string;
}
