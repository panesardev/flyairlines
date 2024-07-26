import { decodeJwt } from "jose";
import { ExtendedJwtPayload } from "./auth.interface";

export function decode(token: string): ExtendedJwtPayload {
  return decodeJwt(token);
}
