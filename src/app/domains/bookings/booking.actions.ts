import { Booking } from "./booking.interface";

export class FindBookings {
  static readonly type = FindBookings.name;
}

export class FindBookingById {
  static readonly type = FindBookingById.name;
  constructor(public readonly id: Booking['id']) {}
}

export class CreateBooking {
  static readonly type = CreateBooking.name;
  constructor(public readonly booking: Booking) {}
}

export class UpdateBooking {
  static readonly type = UpdateBooking.name;
  constructor(public readonly booking: Booking) {}
}

export class RemoveBooking {
  static readonly type = RemoveBooking.name;
  constructor(public readonly id: Booking['id']) {}
}
