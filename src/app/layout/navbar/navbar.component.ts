import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BRAND } from '../../app.constants';
import { select } from '@ngxs/store';
import { AuthStateToken } from '../../auth/auth.state';
import { ModalService } from '../modals/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private modal = inject(ModalService);

  authState = select(AuthStateToken);

  brand = BRAND;

  isAuthenticated = computed(() => this.authState().isAuthenticated);

  openLogin() {
    const fn = () => import('../modals/components/login.component').then(c => c.LoginComponent);
    this.modal.open(fn);
  }
}
