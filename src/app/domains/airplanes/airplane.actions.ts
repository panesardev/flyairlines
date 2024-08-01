import { Airplane } from "./airplane.interface";

export class FindAirplanes {
  static readonly type = FindAirplanes.name;
}

export class FindAirplaneByModel {
  static readonly type = FindAirplaneByModel.name;
  constructor(public readonly model: string) {}
}

export class CreateAirplane {
  static readonly type = CreateAirplane.name;
  constructor(public readonly airplane: Airplane) {}
}

export class UpdateAirplane {
  static readonly type = UpdateAirplane.name;
  constructor(public readonly airplane: Airplane) {}
}

export class RemoveAirplane {
  static readonly type = RemoveAirplane.name;
  constructor(public readonly id: Airplane['id']) {}
}