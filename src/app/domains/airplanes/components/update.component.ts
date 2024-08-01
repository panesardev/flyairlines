import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Modal, ModalComponent } from '../../../layout/modals/modal.component';
import { UpdateAirplane } from '../airplane.actions';
import { Airplane } from '../airplane.interface';
import { AirplaneState } from '../airplane.state';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ModalComponent,
  ],
  template: `
    <app-modal heading="Update Airplane">
      <form [formGroup]="form" (submit)="update()" class="grid gap-6">
        <fieldset>
          <label>Enter model</label>
          <input type="text" formControlName="model" placeholder="model">
        </fieldset>
        <div class="grid grid-cols-2 gap-6">
          <fieldset>
            <label>Enter capacity</label>
            <input type="text" class="min-w-0" formControlName="capacity" placeholder="capacity">
          </fieldset>
          <fieldset>
            <label>Enter occupied</label>
            <input type="text" class="min-w-0" formControlName="occupied" placeholder="occupied">
          </fieldset>
        </div>
        <fieldset>
          <label>Enter price</label>
          <input type="text" formControlName="price" placeholder="price">
        </fieldset>
        <fieldset>
          <label class="flex items-center gap-2">
            <input type="checkbox" class="accent-primary scale-[1.25] ml-1" formControlName="isBooked" placeholder="isBooked">
            <span>Set booked</span>
          </label>
        </fieldset>
        <div class="grid">
          <button class="btn btn-primary">Update</button>
        </div>
      </form>
    </app-modal>
  `,
})
export class UpdateComponent extends Modal {
  private store = inject(Store);

  airplane = this.store.selectSignal(AirplaneState.selectedAirplane);

  form = new FormGroup({
    model: new FormControl('', Validators.required),
    capacity: new FormControl(0, Validators.required),
    occupied: new FormControl(0, Validators.required),
    price: new FormControl(0, Validators.required),
    isBooked: new FormControl(false, Validators.required),
  });

  setForm = effect(() => {
    if (this.airplane()) {
      this.form.setValue({
        model: this.airplane().model,
        capacity: this.airplane().capacity,
        occupied: this.airplane().occupied,
        price: this.airplane().price,
        isBooked: this.airplane().isBooked,
      });
    }
  });

  update() {
    if (this.form.valid) {
      const airplane: Airplane = {
        id: this.airplane().id,
        model: this.form.value.model,
        capacity: this.form.value.capacity,
        occupied: this.form.value.occupied,
        price: this.form.value.price,
        isBooked: this.form.value.isBooked,
      };
      this.store.dispatch(new UpdateAirplane(airplane));
      this.modal.close();
    }
  }
}
