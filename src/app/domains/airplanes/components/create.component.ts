import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Modal, ModalComponent } from '../../../layout/modals/modal.component';
import { CreateAirplane } from '../airplane.actions';
import { Airplane } from '../airplane.interface';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ModalComponent,
  ],
  template: `
    <app-modal heading="Create Airplane">
      <form [formGroup]="form" (submit)="create()" class="grid gap-6">
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
          <button class="btn btn-primary">Create</button>
        </div>
      </form>
    </app-modal>
  `,
})
export class CreateComponent extends Modal {
  private store = inject(Store);

  form = new FormGroup({
    model: new FormControl('', Validators.required),
    capacity: new FormControl(0, Validators.required),
    occupied: new FormControl(0, Validators.required),
    price: new FormControl(0, Validators.required),
    isBooked: new FormControl(false, Validators.required),
  });

  create() {
    if (this.form.valid) {
      const airplane: Airplane = {
        model: this.form.value.model,
        capacity: this.form.value.capacity,
        occupied: this.form.value.occupied,
        price: this.form.value.price,
        isBooked: this.form.value.isBooked,
      };
      this.store.dispatch(new CreateAirplane(airplane));
      this.modal.close();
    }
  }
}
