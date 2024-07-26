import { CreateAccountRequest, LoginRequest } from "./auth.interface";

export class Login {
  static readonly type = '[AUTH] Login';
  constructor(public body: LoginRequest) {}
}

export class CreateAccount {
  static readonly type = '[AUTH] CreateAccount';
  constructor(public body: CreateAccountRequest) {}
}

export class Logout {
  static readonly type = '[AUTH] Logout';
}

export class FindUser {
  static readonly type = '[Auth] FindUser';
  constructor(public token: string) {}
}
