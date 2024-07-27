import { Component, input } from '@angular/core';
import { Destination } from '../destination.interface';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-base-200 custom-shadow rounded-lg p-8">
      <h1 class="text-primary text-2xl font-bold mb-3">{{ destination().name }}</h1>
      <p class="mb-6">{{ destination().code }}</p>
      <button class="btn btn-secondary w-full">Select</button>
    </div>
  `,
})
export class DestinationCardComponent {
  destination = input.required<Destination>();
}
