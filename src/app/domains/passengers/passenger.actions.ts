import { Passenger } from "./passenger.interface";

export class FindPassengers {
  static readonly type = FindPassengers.name;
}

export class FindPassengerById {
  static readonly type = FindPassengerById.name;
  constructor(public readonly id: Passenger['id']) {}
}

export class CreatePassenger {
  static readonly type = CreatePassenger.name;
  constructor(public readonly passenger: Passenger) {}
}

export class UpdatePassenger {
  static readonly type = UpdatePassenger.name;
  constructor(public readonly passenger: Passenger) {}
}

export class RemovePassenger {
  static readonly type = RemovePassenger.name;
  constructor(public readonly id: Passenger['id']) {}
}