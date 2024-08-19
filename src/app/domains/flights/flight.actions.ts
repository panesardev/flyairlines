import { Flight } from "./flight.interface";

export class FindFlights {
  static readonly type = '[FLIGHTS] Find Flights';
}

export class FindFlightByNumber {
  static readonly type = '[FLIGHTS] Find Flight By Number';
  constructor(public readonly number: string) {}
}

export class CreateFlight {
  static readonly type = '[FLIGHTS] Create Flight';
  constructor(public readonly flight: Flight) {}
}

export class UpdateFlight {
  static readonly type = '[FLIGHTS] Update Flight';
  constructor(public readonly flight: Flight) {}
}

export class RemoveFlight {
  static readonly type = '[FLIGHTS] Remove Flight';
  constructor(public readonly id: Flight['id']) {}
}