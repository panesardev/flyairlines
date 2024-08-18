import { Component, computed, effect, input, model } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewBookingStateType } from '../pages/new-booking/new-booking.state';

@Component({
  selector: 'app-date-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <p class="mb-2">Select departure and arrival</p>
    <div class="grid md:flex items-center gap-3 md:gap-6 mb-6">
      <fieldset class="md:w-60">
        <input class="w-full" type="date" [formControl]="departureDateControl" name="fromDepartureDate" [min]="minDepartureDate()">
      </fieldset>
      @if (isRoundTrip() && departureDateControl.valid) {
        <div class="flex justify-center items-center">
          <i class="text-primary"><svg class="w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M19,2h-1V1c0-.552-.447-1-1-1s-1,.448-1,1v1H8V1c0-.552-.447-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5ZM5,4h14c1.654,0,3,1.346,3,3v1H2v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3V10H22v9c0,1.654-1.346,3-3,3Zm0-8c0,.552-.447,1-1,1H6c-.553,0-1-.448-1-1s.447-1,1-1h12c.553,0,1,.448,1,1Zm-7,4c0,.552-.447,1-1,1H6c-.553,0-1-.448-1-1s.447-1,1-1h5c.553,0,1,.448,1,1Z"/></svg></i>
        </div>
        <fieldset class="md:w-60">
          <input class="w-full" type="date" [formControl]="arrivalDateControl" name="toDepartureDate" [min]="minArrivalDate()">
        </fieldset>
      }
    </div>
  `,
})
export class DateFormComponent {
  isRoundTrip = input.required<boolean>();

  departureDate = model<string>(null);
  arrivalDate = model<string>(null);
  
  departureDateControl = new FormControl('', Validators.required);
  arrivalDateControl = new FormControl('', Validators.required);

  minDepartureDate = computed(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return formatDate(today);
  });

  minArrivalDate = computed(() => {
    const date = new Date(this.departureDateControl.value);
    date.setDate(date.getDate() + 3);
    return formatDate(date);
  });

  setDepartureDate = this.departureDateControl.valueChanges
    .pipe(takeUntilDestroyed())
    .subscribe(v => this.departureDate.set(v));

  setArrivalDate = this.arrivalDateControl.valueChanges
    .pipe(takeUntilDestroyed())
    .subscribe(v => this.arrivalDate.set(v));

  setDates = effect(() => {
    if (this.departureDate()) {
      this.departureDateControl.setValue(this.departureDate());
    }
    if (this.arrivalDate()) {
      this.arrivalDateControl.setValue(this.arrivalDate());
    }
  }, { allowSignalWrites: true });
}

export function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = date.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}