import { Passenger } from "./passenger.interface";

export class FindPassengers {
  static readonly type = '[PASSENGERS] Find Passengers';
}

export class FindPassengerById {
  static readonly type = '[PASSENGERS] Find Passenger By Id';
  constructor(public readonly id: Passenger['id']) {}
}

export class CreatePassenger {
  static readonly type = '[PASSENGERS] Create Passenger';
  constructor(public readonly passenger: Passenger) {}
}

export class UpdatePassenger {
  static readonly type = '[PASSENGERS] Update Passenger';
  constructor(public readonly passenger: Passenger) {}
}

export class RemovePassenger {
  static readonly type = '[PASSENGERS] Remove Passenger';
  constructor(public readonly id: Passenger['id']) {}
}