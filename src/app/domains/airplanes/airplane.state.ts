import { inject, Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { catchError, EMPTY, tap } from "rxjs";
import { CreateAirplane, FindAirplaneByModel, FindAirplanes, RemoveAirplane, UpdateAirplane } from "./airplane.actions";
import { Airplane } from "./airplane.interface";
import { AirplaneService } from "./airplane.service";

export interface AirplaneStateType {
  airplanes: Airplane[];
  selectedAirplane: Airplane;
}

export const initialState: AirplaneStateType = {
  airplanes: [],
  selectedAirplane: null,
};

export const AirplaneStateToken = new StateToken<AirplaneStateType>('airplane');

@State({
  name: AirplaneStateToken,
  defaults: initialState,
})
@Injectable()
export class AirplaneState implements NgxsOnInit {
  private airplaneService = inject(AirplaneService);

  @Selector([AirplaneState])
  static airplanes(state: AirplaneStateType): Airplane[] {
    return state.airplanes;
  }
  
  @Selector([AirplaneState])
  static selectedAirplane(state: AirplaneStateType): Airplane {
    return state.selectedAirplane;
  }

  ngxsOnInit(ctx: StateContext<AirplaneStateType>): void {
    ctx.dispatch(new FindAirplanes());
  }

  @Action(FindAirplanes)
  findAirplanes(ctx: StateContext<AirplaneStateType>) {
    return this.airplaneService.findAll().pipe(
      tap(airplanes => ctx.patchState({ airplanes })),
      catchError(e => {
        console.log(FindAirplanes.name, e.message);
        ctx.patchState({ airplanes: [] });
        return EMPTY;
      }),
    );
  }
  
  @Action(FindAirplaneByModel)
  findAirplaneByModel(ctx: StateContext<AirplaneStateType>, action: FindAirplaneByModel) {
    return this.airplaneService.findByModel(action.model).pipe(
      tap(airplane => ctx.patchState({ selectedAirplane: airplane })),
      catchError(e => {
        console.log(FindAirplaneByModel.name, e.message);
        ctx.patchState({ selectedAirplane: null });
        return EMPTY;
      }),
    );
  }

  @Action(CreateAirplane)
  createAirplane(ctx: StateContext<AirplaneStateType>, action: CreateAirplane) {
    return this.airplaneService.create(action.airplane).pipe(
      tap(() => ctx.dispatch(new FindAirplanes())),
      catchError(e => {
        console.log(CreateAirplane.name, e.message);
        ctx.patchState({ selectedAirplane: null });
        return EMPTY;
      }),
    );
  }
  
  @Action(UpdateAirplane)
  updateAirplane(ctx: StateContext<AirplaneStateType>, action: UpdateAirplane) {
    return this.airplaneService.update(action.airplane).pipe(
      tap(() => ctx.dispatch(new FindAirplanes())),
      catchError(e => {
        console.log(UpdateAirplane.name, e.message);
        ctx.patchState({ selectedAirplane: null });
        return EMPTY;
      }),
    );
  }
  
  @Action(RemoveAirplane)
  removeAirplane(ctx: StateContext<AirplaneStateType>, action: RemoveAirplane) {
    return this.airplaneService.remove(action.id).pipe(
      tap(() => ctx.dispatch(new FindAirplanes())),
      catchError(e => {
        console.log(RemoveAirplane.name, e.message);
        ctx.patchState({ selectedAirplane: null });
        return EMPTY;
      }),
    );
  } 
}