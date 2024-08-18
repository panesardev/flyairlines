import { CanActivateFn } from "@angular/router";
import { select } from "@ngxs/store";
import { AuthStateToken } from "./auth.state";

export const AuthGuard: CanActivateFn = () => {
  const authState = select(AuthStateToken);
  return authState().isAuthenticated;
}

export const AdminGuard: CanActivateFn = () => {
  const authState = select(AuthStateToken);
  return authState().isAdmin;
}
