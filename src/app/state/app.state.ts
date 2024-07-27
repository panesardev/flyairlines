import { inject, Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext, StateToken } from "@ngxs/store";
import { Destination } from "../domains/destinations/destination.interface";
import { destinationService } from "../domains/destinations/destination.service";
import { GetDestinations } from "./app.actions";
import { catchError, EMPTY, switchMap, tap } from "rxjs";

export interface AppStateType {
  destinations: Destination[];
}

const initialState: AppStateType = {
  destinations: [],
};

export const AppStateToken = new StateToken<AppStateType>('app');

@State({
  name: AppStateToken,
  defaults: initialState,
})
@Injectable()
export class AppState implements NgxsOnInit {
  private destinationService = inject(destinationService);

  ngxsOnInit(ctx: StateContext<AppStateType>): void {
    ctx.dispatch(new GetDestinations());
  }

  @Action(GetDestinations)
  getDestinations(ctx: StateContext<AppStateType>, action: GetDestinations) {
    return this.destinationService.destinations$.pipe(
      tap(destinations => ctx.patchState({ destinations })),
      catchError(e => {
        alert(e.message);
        ctx.patchState({ destinations: [] });
        return EMPTY;
      }),
    );
  }
}