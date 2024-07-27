import { Booking } from "../bookings/booking.interface";

export interface User {
  id?: number;
  email: string;
  password?: string;
  displayName: string;
  bookings: Booking[];
  created: Date;
}
