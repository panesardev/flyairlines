import { User } from "./user.interface";

export class FindUsers {
  static readonly type = FindUsers.name;
}

export class FindUserById {
  static readonly type = FindUserById.name;
  constructor(public readonly id: User['id']) {}
}

export class CreateUser {
  static readonly type = CreateUser.name;
  constructor(public readonly user: User) {}
}

export class UpdateUser {
  static readonly type = UpdateUser.name;
  constructor(public readonly user: User) {}
}

export class RemoveUser {
  static readonly type = RemoveUser.name;
  constructor(public readonly id: User['id']) {}
}