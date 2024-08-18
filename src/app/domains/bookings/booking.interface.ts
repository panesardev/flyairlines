import { Flight } from "../flights/flight.interface";
import { User } from "../users/user.interface";

export interface Booking {
  id?: number;
  user: User;
  flight: Flight;
  created: Date;
  updated: Date;
}
