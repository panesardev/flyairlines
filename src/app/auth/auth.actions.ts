import { CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";

export class Login {
  static readonly type = Login.name;
  constructor(public body: LoginRequestBody) {}
}

export class CreateAccount {
  static readonly type = CreateAccount.name;
  constructor(public body: CreateAccountRequestBody) {}
}

export class Logout {
  static readonly type = Logout.name;
}

export class FindUser {
  static readonly type = FindUser.name;
  constructor(public token: string) {}
}
