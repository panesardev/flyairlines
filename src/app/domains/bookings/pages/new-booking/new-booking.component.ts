import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Destination } from '../../../destinations/destination.interface';
import { DestinationState } from '../../../destinations/destination.state';
import { DateFormComponent } from '../../components/date-form.component';
import { DestinationFormComponent } from '../../components/destination-form.component';
import { RoundTripFormComponent } from '../../components/round-trip-form.component';
import { ClearBooking, SetArrivalDate, SetArrivalDestination, SetDepartureDate, SetDepartureDestination, SetRoundTrip } from './new-booking.actions';
import { NewBookingStateToken } from './new-booking.state';

type Step = 1 | 2 | 3;

@Component({
  selector: 'app-new-booking',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    JsonPipe,
    RoundTripFormComponent,
    DateFormComponent,
    DestinationFormComponent,
  ],
  templateUrl: './new-booking.component.html',
})
export default class NewBookingComponent {
  private store = inject(Store);

  newBookingState = this.store.selectSignal(NewBookingStateToken);
  destinations = this.store.selectSignal(DestinationState.destinations);

  step = signal<Step>(1);

  setRoundTrip(v: boolean) {
    this.store.dispatch(new SetRoundTrip(v));
  }

  setDepartureDestination(destination: Destination) {
    this.store.dispatch(new SetDepartureDestination(destination));
  }
  
  setArrivalDestination(destination: Destination) {
    this.store.dispatch(new SetArrivalDestination(destination));
  }

  setDepartureDate(date: string) {
    this.store.dispatch(new SetDepartureDate(date));
  }
  
  setArrivalDate(date: string) {
    this.store.dispatch(new SetArrivalDate(date));
  }
  
  clearBooking() {
    this.store.dispatch(new ClearBooking());
  }
  
}
