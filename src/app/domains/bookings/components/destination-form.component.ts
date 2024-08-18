import { Component, effect, input, model, signal } from '@angular/core';
import { Destination } from '../../destinations/destination.interface';

@Component({
  selector: 'app-destination-form',
  standalone: true,
  template: `
    <div>
      <p class="mb-2">Select Destinations</p>
      <div class="grid md:flex items-center gap-3 md:gap-6 mb-6">
        <div class="dropdown">
          <div tabindex="0" role="button" class="bg-base-100 text-primary rounded-md md:w-60 px-4 py-3">{{ departureDestination() ? departureDestination().name + ' (' + departureDestination().code + ')' : 'Select Departure' }}</div>
          <div tabindex="0" class="dropdown-content bg-base-200 rounded-2xl z-[1] max-h-96 overflow-y-scroll md:w-60 p-2 custom-shadow">
            @for (destination of departureDestinations(); track $index) {
              <a class="block hover:bg-base-100 px-4 py-2 rounded-lg cursor-pointer" (click)="departureDestination.set(destination)">{{ destination.name }}</a>
            }
          </div>
        </div>
        @if (departureDestination()) {
          <div class="flex justify-center items-center">
            <i class="text-primary"><svg class="w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z"/></svg></i>
          </div>
          <div class="dropdown">
            <div tabindex="0" role="button" class="bg-base-100 text-primary rounded-md md:w-60 px-4 py-3">{{ arrivalDestination() ? arrivalDestination().name + ' (' + arrivalDestination().code + ')' : 'Select Arrival' }}</div>
            <div tabindex="0" class="dropdown-content bg-base-200 rounded-2xl z-[1] max-h-96 overflow-y-scroll md:w-60 p-2 custom-shadow">
              @for (destination of arrivalDestinations(); track $index) {
                <a class="block hover:bg-base-100 px-4 py-2 rounded-lg cursor-pointer" (click)="arrivalDestination.set(destination)">{{ destination.name }}</a>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class DestinationFormComponent {
  destinations = input.required<Destination[]>();

  departureDestinations = signal<Destination[]>([]);
  arrivalDestinations = signal<Destination[]>([]);

  departureDestination = model<Destination>(null);
  arrivalDestination = model<Destination>(null);

  setDestinations = effect(() => {
    this.departureDestinations.set(this.destinations());
    if (this.departureDestination()) {
      this.arrivalDestinations.set(this.destinations().filter(d => d.code !== this.departureDestination().code));
    }
  }, { allowSignalWrites: true });

  evaluateArrivalDestination = effect(() => {
    if (this.departureDestination() && this.arrivalDestination() && this.departureDestination().code === this.arrivalDestination().code) {
      this.arrivalDestination.set(null);
    }
  }, { allowSignalWrites: true });

}
