import { CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";

export class Login {
  static readonly type = '[AUTH] Login';
  constructor(public body: LoginRequestBody) {}
}

export class CreateAccount {
  static readonly type = '[AUTH] CreateAccount';
  constructor(public body: CreateAccountRequestBody) {}
}

export class Logout {
  static readonly type = '[AUTH] Logout';
}

export class FindUser {
  static readonly type = '[Auth] FindUser';
  constructor(public token: string) {}
}
