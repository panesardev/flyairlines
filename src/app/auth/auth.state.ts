import { inject, Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext, StateToken } from "@ngxs/store";
import { catchError, EMPTY, switchMap, tap } from "rxjs";
import { UserService } from "../domains/users/user.service";
import { CreateAccount, FindUser, Login, Logout } from "./auth.actions";
import { AuthStateType } from "./auth.interface";
import { AuthService } from "./auth.service";
import { decode } from "./auth.utilities";

const initialState: AuthStateType = {
  isAuthenticated: false,
  user: null,
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
    
    if (token) {
      ctx.dispatch(new FindUser(token));
    }
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateType>, action: Login) {
    return this.authService.login(action.body).pipe(
      switchMap(token => ctx.dispatch(new FindUser(token))),
      catchError(e => {
        alert(e.message);
        ctx.setState(initialState);
        return EMPTY;
      }),
    );
  }
  
  @Action(CreateAccount)
  createAccount(ctx: StateContext<AuthStateType>, action: CreateAccount) {
    return this.authService.createAccount(action.body).pipe(
      switchMap(token => ctx.dispatch(new FindUser(token))),
      catchError(e => {
        alert(e.message);
        ctx.setState(initialState);
        return EMPTY;
      }),
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateType>) {
    this.authService.logout();
    ctx.setState(initialState);
  } 

  @Action(FindUser)
  findUser(ctx: StateContext<AuthStateType>, action: FindUser) {
    const userId = decode(action.token).userId;
    return this.userService.findById(userId).pipe(
      tap(response => ctx.patchState({ 
        token: action.token,
        user: response.payload,
        isAuthenticated: true,
      })),
      catchError(e => {
        alert(e.message);
        ctx.setState(initialState);
        return EMPTY;
      }),
    );
  }
}
