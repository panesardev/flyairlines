import { User } from "../users/user.interface";
import { Passenger } from "../passengers/passenger.interface";

export interface Booking {
  id?: number;
  user: User;
  passengers: Passenger[];
  fromDestinationId: number;
  toDestinationId: number;
  aircraftId: number;
  time: Date;
  created: Date;
  updated: Date;
}
