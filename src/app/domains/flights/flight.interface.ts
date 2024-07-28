import { Booking } from "../bookings/booking.interface";

export interface Flight {
  id?: number;
  number: string;
  booking: Booking;
  fromDestinationCode: string;
  toDestinationCode: string;
  date: Date;
  aircraftId: number;
}
