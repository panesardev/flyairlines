import { Booking } from "./booking.interface";

export class FindBookings {
  static readonly type = '[BOOKINGS] Find Bookings';
}

export class FindBookingById {
  static readonly type = '[BOOKINGS] Find Booking By Id';
  constructor(public readonly id: Booking['id']) {}
}

export class CreateBooking {
  static readonly type = '[BOOKINGS] Create Booking';
  constructor(public readonly booking: Booking) {}
}

export class UpdateBooking {
  static readonly type = '[BOOKINGS] Update Booking';
  constructor(public readonly booking: Booking) {}
}

export class RemoveBooking {
  static readonly type = '[BOOKINGS] Remove Booking';
  constructor(public readonly id: Booking['id']) {}
}