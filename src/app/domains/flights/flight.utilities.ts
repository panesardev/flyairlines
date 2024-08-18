import { Flight } from "./flight.interface";

export function createEmptyFlight(): Flight {
  return {
    date: new Date().toString(),
    fromDestinationCode: null,
    toDestinationCode: null,
    isRoundTrip: false,
  }
}
