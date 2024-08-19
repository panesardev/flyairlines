import { inject, Injectable } from "@angular/core";
import { Navigate } from "@ngxs/router-plugin";
import { Action, NgxsOnInit, State, StateContext, StateToken } from "@ngxs/store";
import { catchError, EMPTY, switchMap, tap } from "rxjs";
import { FindUserById } from "../domains/users/user.actions";
import { UserService } from "../domains/users/user.service";
import { CreateAccount, Login, Logout } from "./auth.actions";
import { AuthStateType } from "./auth.interface";
import { AuthService } from "./auth.service";
import { decode } from "./auth.utilities";

const initialState: AuthStateType = {
  isAuthenticated: false,
  user: null,
  isAdmin: true,
  token: null,
};

export const AuthStateToken = new StateToken<AuthStateType>('auth');

@State({
  name: AuthStateToken, 
  defaults: initialState, 
})
@Injectable()
export class AuthState implements NgxsOnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  ngxsOnInit(ctx: StateContext<AuthStateType>) {
    const token = this.authService.getToken();
    console.log(token);
    
    if (token) {
      ctx.patchState({ isAuthenticated: true, token });
      const userId = decode(token).userId;
      ctx.dispatch(new FindUserById(userId));
    }
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateType>, action: Login) {
    return this.authService.login(action.body).pipe(
      switchMap(token => {
        ctx.patchState({ isAuthenticated: true, token });
        const userId = decode(token).userId;
        return ctx.dispatch([
          new FindUserById(userId),
          new Navigate(['/users/profile']),
        ]);
      }),
      catchError(e => {
        console.log(e.message);
        ctx.setState(initialState);
        return EMPTY;
      }),
    );
  }
  
  @Action(CreateAccount)
  createAccount(ctx: StateContext<AuthStateType>, action: CreateAccount) {
    return this.authService.createAccount(action.body).pipe(
      switchMap(token => {
        ctx.patchState({ isAuthenticated: true, token });
        const userId = decode(token).userId;
        return ctx.dispatch([
          new FindUserById(userId),
          new Navigate(['/users/profile']),
        ]);
      }),
      catchError(e => {
        console.log(e.message);
        ctx.setState(initialState);
        return EMPTY;
      }),
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateType>) {
    this.authService.logout();
    ctx.setState(initialState);
    ctx.dispatch(new Navigate(['/']));
  } 

  @Action(FindUserById)
  findUser(ctx: StateContext<AuthStateType>, action: FindUserById) {
    return this.userService.findById(action.id).pipe(
      tap(user => ctx.patchState({ user })),
      catchError(e => {
        console.log(FindUserById.name, e.message);
        ctx.setState(initialState);
        return EMPTY;
      }),
    );
  }
}
