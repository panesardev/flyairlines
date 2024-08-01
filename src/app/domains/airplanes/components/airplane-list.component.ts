import { Component, input, output } from '@angular/core';
import { Airplane } from '../airplane.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-airplane-list',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-base-200 grid place-content-center custom-shadow rounded-2xl p-6">
        <button class="btn btn-primary px-8" (click)="onCreate.emit()">
          <svg class="w-3 h-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/></g></svg>
          <span>Add Airplane</span>
        </button>
      </div>
      @for (airplane of airplanes(); track airplane.id) {
        <div class="bg-base-200 custom-shadow rounded-2xl p-6">
          <h1 class="text-primary text-xl font-bold mb-3">Model {{ airplane.model }}</h1>
          <div class="grid gap-2 mb-6">
            <div class="flex justify-between items-center gap-6">
              <span>Capacity</span><span>{{ airplane.capacity }}</span>
            </div>
            <div class="flex justify-between items-center gap-6">
              <span>Occupied</span><span>{{ airplane.occupied }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <button (click)="onRemove.emit(airplane)" class="btn btn-error w-full">Remove</button>
            <button (click)="onUpdate.emit(airplane)" class="btn btn-primary w-full">Update</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class AirplaneListComponent {
  airplanes = input.required<Airplane[]>();
  onCreate = output<void>();
  onUpdate = output<Airplane>();
  onRemove = output<Airplane>();
}
