import { Component, input, output } from '@angular/core';
import { Destination } from '../destination.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-base-200 custom-shadow rounded-2xl p-4 md:p-6">
      <h1 class="text-primary text-xl font-bold mb-3">{{ destination().name }}</h1>
      <p class="mb-6">{{ destination().code }}</p>
      <button routerLink="/bookings/new-booking" class="btn btn-secondary w-full" (click)="onSelect.emit(destination())">Select</button>
    </div>
  `,
})
export class DestinationCardComponent {
  destination = input.required<Destination>();
  onSelect = output<Destination>();
}
