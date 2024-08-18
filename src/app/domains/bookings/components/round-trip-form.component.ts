import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-round-trip-form',
  standalone: true,
  template: `
    <div class="flex items-center gap-6 mb-6">
      <div class="flex items-center gap-3">
        <input id="one-way-trip" type="radio" name="radio-3" class="radio radio-secondary" checked="checked" (change)="setRoundTrip.emit(false)"/>
        <label for="one-way-trip" class="cursor-pointer">One way trip</label>
      </div>
      <div class="flex items-center gap-3">
        <input id="round-trip" type="radio" name="radio-3" class="radio radio-secondary" [checked]="isRoundTrip()" (change)="setRoundTrip.emit(true)"/>
        <label for="round-trip" class="cursor-pointer">Round trip</label>
      </div>
    </div>
  `,
})
export class RoundTripFormComponent {
  isRoundTrip = input.required<boolean>();
  setRoundTrip = output<boolean>();
}
