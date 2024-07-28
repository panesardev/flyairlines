import { Destination } from "./destination.interface";

export class FindDestinations {
  static readonly type = FindDestinations.name;
}

export class FindDestinationByCode {
  static readonly type = FindDestinationByCode.name;
  constructor(public readonly code: string) {}
}

export class CreateDestination {
  static readonly type = CreateDestination.name;
  constructor(public readonly destination: Destination) {}
}

export class UpdateDestination {
  static readonly type = UpdateDestination.name;
  constructor(public readonly destination: Destination) {}
}

export class RemoveDestination {
  static readonly type = RemoveDestination.name;
  constructor(public readonly id: Destination['id']) {}
}