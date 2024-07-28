import { User } from "../users/user.interface";
import { Passenger } from "../passengers/passenger.interface";
import { Flight } from "../flights/flight.interface";

export interface Booking {
  id?: number;
  user: User;
  passengers: Passenger[];
  flight: Flight;
  created: Date;
  updated: Date;
}
