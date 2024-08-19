import { CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";

export class Login {
  static readonly type = "[AUTH] Login";
  constructor(public body: LoginRequestBody) {}
}

export class CreateAccount {
  static readonly type = "[AUTH] Create Account";
  constructor(public body: CreateAccountRequestBody) {}
}

export class Logout {
  static readonly type = "[AUTH] Logout";
}
