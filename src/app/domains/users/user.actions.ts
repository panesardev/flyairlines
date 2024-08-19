import { User } from "./user.interface";

export class FindUsers {
  static readonly type = '[USERS] Find Users';
}

export class FindUserById {
  static readonly type = '[USERS] Find User By Id';
  constructor(public readonly id: User['id']) {}
}

export class CreateUser {
  static readonly type = '[USERS] Create User';
  constructor(public readonly user: User) {}
}

export class UpdateUser {
  static readonly type = '[USERS] Update User';
  constructor(public readonly user: User) {}
}

export class RemoveUser {
  static readonly type = '[USERS] Remove User';
  constructor(public readonly id: User['id']) {}
}