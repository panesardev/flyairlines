import { Destination } from "./destination.interface";

export class FindDestinations {
  static readonly type = '[DESTINATIONS] Find Destinations';
}

export class FindDestinationByCode {
  static readonly type = '[DESTINATIONS] Find Destination By Code';
  constructor(public readonly code: string) {}
}

export class CreateDestination {
  static readonly type = '[DESTINATIONS] Create Destination';
  constructor(public readonly destination: Destination) {}
}

export class UpdateDestination {
  static readonly type = '[DESTINATIONS] Update Destination';
  constructor(public readonly destination: Destination) {}
}

export class RemoveDestination {
  static readonly type = '[DESTINATIONS] Remove Destination';
  constructor(public readonly id: Destination['id']) {}
}