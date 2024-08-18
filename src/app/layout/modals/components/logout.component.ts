import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Modal, ModalComponent } from '../modal.component';
import { Logout } from '../../../auth/auth.actions';
import { AuthStateToken } from '../../../auth/auth.state';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    ModalComponent,
    RouterLink,
  ],
  template: `
    <app-modal heading="Logout">
      <div class="bg-base-100 text-primary mb-6 px-6 py-4 rounded-full">
        <span>Logged in as {{ authState().user.displayName }}</span>
      </div>
      <p class="mb-6">You will be logged out!</p>
      <div class="grid grid-cols-2 gap-6 w-full">
        <button class="btn bg-base-100 text-primary hover:bg-base-100" (click)="modal.close()">
          <span>Cancel</span>
        </button>
        <button class="btn btn-primary" (click)="logout()">
          <span>Logout</span>
        </button>
      </div>
    </app-modal>
  `,
})
export class LogoutComponent extends Modal {
  private store = inject(Store);

  authState = this.store.selectSignal(AuthStateToken);

  logout() {
    this.store.dispatch(new Logout());
    this.modal.close();
  } 
}
