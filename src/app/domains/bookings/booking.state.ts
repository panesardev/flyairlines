import { inject, Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { catchError, EMPTY, tap } from "rxjs";
import { CreateBooking, FindBookingById, FindBookings, RemoveBooking, UpdateBooking } from "./booking.actions";
import { Booking } from "./booking.interface";
import { BookingService } from "./booking.service";

export interface BookingStateType {
  bookings: Booking[];
  selectedBooking: Booking;
}

export const initialState: BookingStateType = {
  bookings: [],
  selectedBooking: null,
};

export const BookingStateToken = new StateToken<BookingStateType>('booking');

@State({
  name: BookingStateToken,
  defaults: initialState,
})
@Injectable()
export class BookingState {
  private bookingService = inject(BookingService);

  @Selector([BookingState])
  static bookings(state: BookingStateType): Booking[] {
    return state.bookings;
  }
  
  @Selector([BookingState])
  static selectedBooking(state: BookingStateType): Booking {
    return state.selectedBooking;
  }

  @Action(FindBookings)
  findBookings(ctx: StateContext<BookingStateType>) {
    return this.bookingService.findAll().pipe(
      tap(bookings => ctx.patchState({ bookings })),
      catchError(e => {
        console.log(FindBookings.name, e.message);
        ctx.patchState({ bookings: [] });
        return EMPTY;
      }),
    );
  }
  
  @Action(FindBookingById)
  findBookingById(ctx: StateContext<BookingStateType>, action: FindBookingById) {
    return this.bookingService.findById(action.id).pipe(
      tap(booking => ctx.patchState({ selectedBooking: booking })),
      catchError(e => {
        console.log(FindBookingById.name, e.message);
        ctx.patchState({ selectedBooking: null });
        return EMPTY;
      }),
    );
  }

  @Action(CreateBooking)
  createBooking(ctx: StateContext<BookingStateType>, action: CreateBooking) {
    return this.bookingService.create(action.booking).pipe(
      tap(() => ctx.dispatch(new FindBookings())),
      catchError(e => {
        console.log(CreateBooking.name, e.message);
        ctx.patchState({ selectedBooking: null });
        return EMPTY;
      }),
    );
  }
  
  @Action(UpdateBooking)
  updateBooking(ctx: StateContext<BookingStateType>, action: UpdateBooking) {
    return this.bookingService.update(action.booking).pipe(
      tap(() => ctx.dispatch(new FindBookings())),
      catchError(e => {
        console.log(UpdateBooking.name, e.message);
        ctx.patchState({ selectedBooking: null });
        return EMPTY;
      }),
    );
  }
  
  @Action(RemoveBooking)
  removeBooking(ctx: StateContext<BookingStateType>, action: RemoveBooking) {
    return this.bookingService.remove(action.id).pipe(
      tap(() => ctx.dispatch(new FindBookings())),
      catchError(e => {
        console.log(RemoveBooking.name, e.message);
        ctx.patchState({ selectedBooking: null });
        return EMPTY;
      }),
    );
  } 
}