import { Destination } from "../../../destinations/destination.interface";

export class SetRoundTrip {
  static readonly type = SetRoundTrip.name;
  constructor(public readonly isRoundTrip: boolean) {}
}

export class SetDepartureDestination {
  static readonly type = SetDepartureDestination.name;
  constructor(public readonly destination: Destination) {}
}

export class SetArrivalDestination {
  static readonly type = SetArrivalDestination.name;
  constructor(public readonly destination: Destination) {}
}

export class SetDepartureDate {
  static readonly type = SetDepartureDate.name;
  constructor(public readonly date: string) {}
}

export class SetArrivalDate {
  static readonly type = SetArrivalDate.name;
  constructor(public readonly date: string) {}
}

export class SaveBooking {
  static readonly type = SaveBooking.name;
}

export class ClearBooking {
  static readonly type = ClearBooking.name;
}
