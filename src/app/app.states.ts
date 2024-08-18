import { AuthState } from "./auth/auth.state";
import { AirplaneState } from "./domains/airplanes/airplane.state";
import { BookingState } from "./domains/bookings/booking.state";
import { NewBookingState } from "./domains/bookings/pages/new-booking/new-booking.state";
import { DestinationState } from "./domains/destinations/destination.state";

export const states = [
  AuthState, 
  AirplaneState,
  DestinationState,
  BookingState,
  NewBookingState,
];