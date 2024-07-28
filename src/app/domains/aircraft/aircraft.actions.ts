import { Aircraft } from "./aircraft.interface";

export class FindAircraft {
  static readonly type = FindAircraft.name;
}

export class FindAircraftByModel {
  static readonly type = FindAircraftByModel.name;
  constructor(public readonly model: string) {}
}

export class CreateAircraft {
  static readonly type = CreateAircraft.name;
  constructor(public readonly aircraft: Aircraft) {}
}

export class UpdateAircraft {
  static readonly type = UpdateAircraft.name;
  constructor(public readonly aircraft: Aircraft) {}
}

export class RemoveAircraft {
  static readonly type = RemoveAircraft.name;
  constructor(public readonly id: Aircraft['id']) {}
}