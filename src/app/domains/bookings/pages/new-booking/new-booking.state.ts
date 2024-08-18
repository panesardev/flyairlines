import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext, StateToken } from "@ngxs/store";
import { Destination } from "../../../destinations/destination.interface";
import { ClearBooking, SaveBooking, SetArrivalDate, SetArrivalDestination, SetDepartureDate, SetDepartureDestination, SetRoundTrip } from "./new-booking.actions";

export interface NewBookingStateType {
  isRoundTrip: boolean;
  departureDestination: Destination;
  departureDate: string;
  arrivalDestination: Destination;
  arrivalDate: string;
}

const initialState: NewBookingStateType = {
  isRoundTrip: false,
  departureDestination: null,
  departureDate: null,
  arrivalDestination: null,
  arrivalDate: null,
};

export const NewBookingStateToken = new StateToken<NewBookingStateType>('new_booking');

@State({
  name: NewBookingStateToken,
  defaults: initialState,
})
@Injectable()
export class NewBookingState implements NgxsOnInit {
  
  ngxsOnInit(ctx: StateContext<NewBookingStateType>) {
    if (localStorage.getItem(NewBookingStateToken.getName())) {
      ctx.setState(JSON.parse(localStorage.getItem(NewBookingStateToken.getName())));
    }
  }
  
  @Action(SetRoundTrip)
  setRoundTrip(ctx: StateContext<NewBookingStateType>, action: SetRoundTrip) {
    ctx.patchState({ isRoundTrip: action.isRoundTrip });
    ctx.dispatch(new SaveBooking());
  }
  
  @Action(SetDepartureDestination)
  setDepartureDestination(ctx: StateContext<NewBookingStateType>, action: SetDepartureDestination) {
    ctx.patchState({ departureDestination: action.destination });
    ctx.dispatch(new SaveBooking());
  }
  
  @Action(SetDepartureDate)
  setDepartureDate(ctx: StateContext<NewBookingStateType>, action: SetDepartureDate) {
    ctx.patchState({ departureDate: action.date });
    ctx.dispatch(new SaveBooking());
  }
  
  @Action(SetArrivalDestination)
  setArrivalDestination(ctx: StateContext<NewBookingStateType>, action: SetArrivalDestination) {
    ctx.patchState({ arrivalDestination: action.destination });
    ctx.dispatch(new SaveBooking());
  }
  
  @Action(SetArrivalDate)
  setArrivalDate(ctx: StateContext<NewBookingStateType>, action: SetArrivalDate) {
    ctx.patchState({ arrivalDate: action.date });
    ctx.dispatch(new SaveBooking());
  }

  @Action(SaveBooking)
  saveBooking(ctx: StateContext<NewBookingStateType>) {
    localStorage.setItem(NewBookingStateToken.getName(), JSON.stringify(ctx.getState()));
  }
  
  @Action(ClearBooking)
  clearBooking(ctx: StateContext<NewBookingStateType>) {
    localStorage.removeItem(NewBookingStateToken.getName());
    ctx.setState(initialState);
  }
}