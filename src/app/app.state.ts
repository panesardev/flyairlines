import { inject, Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext, StateToken } from "@ngxs/store";
import { catchError, EMPTY, tap } from "rxjs";
import { FindAircraft } from "./domains/aircraft/aircraft.actions";
import { Aircraft } from "./domains/aircraft/aircraft.interface";
import { AircraftService } from "./domains/aircraft/aircraft.service";
import { FindDestinations } from "./domains/destinations/destination.actions";
import { Destination } from "./domains/destinations/destination.interface";
import { DestinationService } from "./domains/destinations/destination.service";

export interface AppStateType {
  aircraft: Aircraft[];
  destinations: Destination[];
}

export const AppStateToken = new StateToken<AppStateType>('app');

@State({
  name: AppStateToken,
  defaults: {
    aircraft: [],
    destinations: [],
  },
})
@Injectable()
export class AppState implements NgxsOnInit {
  private aircraftService = inject(AircraftService);
  private destinationService = inject(DestinationService);

  ngxsOnInit(ctx: StateContext<AppStateType>): void {
    ctx.dispatch(new FindAircraft());
    ctx.dispatch(new FindDestinations());
  }

  @Action(FindAircraft)
  findAircraft(ctx: StateContext<AppStateType>) {
    return this.aircraftService.findAll().pipe(
      tap(aircraft => ctx.patchState({ aircraft })),
      catchError(e => {
        console.log(FindAircraft.name, e.message);
        ctx.patchState({ aircraft: [] });
        return EMPTY;
      }),
    );
  }
  
  @Action(FindDestinations)
  findDestinations(ctx: StateContext<AppStateType>) {
    return this.destinationService.findAll().pipe(
      tap(destinations => ctx.patchState({ destinations })),
      catchError(e => {
        console.log(FindDestinations.name, e.message);
        ctx.patchState({ destinations: [] });
        return EMPTY;
      }),
    );
  }
}