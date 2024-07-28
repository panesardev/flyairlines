import { Flight } from "./flight.interface";

export class FindFlights {
  static readonly type = FindFlights.name;
}

export class FindFlightByNumber {
  static readonly type = FindFlightByNumber.name;
  constructor(public readonly number: string) {}
}

export class CreateFlight {
  static readonly type = CreateFlight.name;
  constructor(public readonly flight: Flight) {}
}

export class UpdateFlight {
  static readonly type = UpdateFlight.name;
  constructor(public readonly flight: Flight) {}
}

export class RemoveFlight {
  static readonly type = RemoveFlight.name;
  constructor(public readonly id: Flight['id']) {}
}