import { Booking } from "../bookings/booking.interface";
import { Passenger } from "../passengers/passenger.interface";

export interface Flight {
  id?: number;
  number?: string;
  booking?: Booking;
  passengers?: Passenger[];
  fromDestinationCode: string;
  toDestinationCode: string;
  isRoundTrip: boolean;
  airplaneModel?: string;
  fromDepartureDate: string;
  toDepartureDate: string;
}

export interface FlightFormValue {
  fromDestinationCode: string;
  toDestinationCode: string;
  isRoundTrip: boolean;
  date: string;
}

