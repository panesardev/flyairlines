import { inject, Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { DestinationService } from "./destination.service";
import { CreateDestination, FindDestinationByCode, FindDestinations, RemoveDestination, UpdateDestination } from "./destination.actions";
import { catchError, EMPTY, tap } from "rxjs";
import { Destination } from "./destination.interface";

export interface DestinationStateType {
  destinations: Destination[];
  selectedDestination: Destination;
}

export const initialState: DestinationStateType = {
  destinations: [],
  selectedDestination: null,
};

export const DestinationStateToken = new StateToken<DestinationStateType>('destination');

@State({
  name: DestinationStateToken,
  defaults: initialState,
})
@Injectable()
export class DestinationState implements NgxsOnInit {
  private destinationService = inject(DestinationService);

  @Selector([DestinationState])
  static destinations(state: DestinationStateType): Destination[] {
    return state.destinations;
  }
  
  @Selector([DestinationState])
  static selectedDestination(state: DestinationStateType): Destination {
    return state.selectedDestination;
  }

  ngxsOnInit(ctx: StateContext<DestinationStateType>): void {
    ctx.dispatch(new FindDestinations());
  }

  @Action(FindDestinations)
  findDestinations(ctx: StateContext<DestinationStateType>) {
    return this.destinationService.findAll().pipe(
      tap(destinations => ctx.patchState({ destinations })),
      catchError(e => {
        console.log(FindDestinations.name, e.message);
        ctx.patchState({ destinations: [] });
        return EMPTY;
      }),
    );
  }
  
  @Action(FindDestinationByCode)
  findDestinationByCode(ctx: StateContext<DestinationStateType>, action: FindDestinationByCode) {
    return this.destinationService.findByCode(action.code).pipe(
      tap(destination => ctx.patchState({ selectedDestination: destination })),
      catchError(e => {
        console.log(FindDestinationByCode.name, e.message);
        ctx.patchState({ selectedDestination: null });
        return EMPTY;
      }),
    );
  }

  @Action(CreateDestination)
  createDestination(ctx: StateContext<DestinationStateType>, action: CreateDestination) {
    return this.destinationService.create(action.destination).pipe(
      tap(() => ctx.dispatch(new FindDestinations())),
      catchError(e => {
        console.log(CreateDestination.name, e.message);
        ctx.patchState({ selectedDestination: null });
        return EMPTY;
      }),
    );
  }
  
  @Action(UpdateDestination)
  updateDestination(ctx: StateContext<DestinationStateType>, action: UpdateDestination) {
    return this.destinationService.update(action.destination).pipe(
      tap(() => ctx.dispatch(new FindDestinations())),
      catchError(e => {
        console.log(UpdateDestination.name, e.message);
        ctx.patchState({ selectedDestination: null });
        return EMPTY;
      }),
    );
  }
  
  @Action(RemoveDestination)
  removeDestination(ctx: StateContext<DestinationStateType>, action: RemoveDestination) {
    return this.destinationService.remove(action.id).pipe(
      tap(() => ctx.dispatch(new FindDestinations())),
      catchError(e => {
        console.log(RemoveDestination.name, e.message);
        ctx.patchState({ selectedDestination: null });
        return EMPTY;
      }),
    );
  } 
}