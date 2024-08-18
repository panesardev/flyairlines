import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthStateToken } from '../../../../auth/auth.state';
import { ModalService } from '../../../../layout/modals/modal.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './profile.component.html',
})
export default class ProfileComponent {
  private store = inject(Store);
  private modal = inject(ModalService);

  authState = this.store.selectSignal(AuthStateToken);

  user = computed(() => this.authState().user);
  isAdmin = computed(() => this.authState().isAdmin);

  logout() {
    const fn = () => import('../../../../layout/modals/components/logout.component').then(c => c.LogoutComponent);
    this.modal.open(fn);
  }

  formatDate(date: Date) {
    const created = new Date(date);
    return created.toDateString();
  }
}
