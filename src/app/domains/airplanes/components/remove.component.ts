import { Component, inject } from '@angular/core';
import { Modal, ModalComponent } from '../../../layout/modals/modal.component';
import { Store } from '@ngxs/store';
import { AirplaneState } from '../airplane.state';
import { RemoveAirplane } from '../airplane.actions';

@Component({
  selector: 'app-remove',
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal heading="Remove Airplane">
      <div class="mb-8">
        <p>Are you sure to remove <strong>{{ airplane().model }}</strong>?</p>
      </div>
      <div class="grid">
        <button class="btn btn-error" (click)="remove()">Remove</button>
      </div>
    </app-modal>
  `,
})
export class RemoveComponent extends Modal {
  private store = inject(Store);

  airplane = this.store.selectSignal(AirplaneState.selectedAirplane);

  remove() {
    this.store.dispatch(new RemoveAirplane(this.airplane().id));
    this.modal.close();
  }
}
