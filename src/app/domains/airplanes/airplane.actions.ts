import { Airplane } from "./airplane.interface";

export class FindAirplanes {
  static readonly type = '[AIRPLANES] Find Airplanes';
}

export class FindAirplaneByModel {
  static readonly type = '[AIRPLANES] Find Airplane By Model';
  constructor(public readonly model: string) {}
}

export class CreateAirplane {
  static readonly type = '[AIRPLANES] Create Airplane';
  constructor(public readonly airplane: Airplane) {}
}

export class UpdateAirplane {
  static readonly type = '[AIRPLANES] Update Airplane';
  constructor(public readonly airplane: Airplane) {}
}

export class RemoveAirplane {
  static readonly type = '[AIRPLANES] Remove Airplane';
  constructor(public readonly id: Airplane['id']) {}
}