import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Login } from '../../../auth/auth.actions';
import { LoginRequestBody } from '../../../auth/auth.interface';
import { LoginFormComponent } from '../../../auth/components/login-form.component';
import { Modal, ModalComponent } from '../modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ModalComponent,
    RouterLink,
    LoginFormComponent,
  ],
  template: `
    <app-modal heading="Login">
      <app-login-form (onSubmit)="login($event)"/>
      <div class="text-center">
        <a class="text-secondary" routerLink="/register" (click)="modal.close()">Register an Account!</a>
      </div>
    </app-modal>
  `,
})
export class LoginComponent extends Modal {
  private store = inject(Store);

  login(body: LoginRequestBody) {
    this.store.dispatch(new Login(body));
  }
}
