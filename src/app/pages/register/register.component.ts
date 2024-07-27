import { Component, inject } from '@angular/core';
import { CreateAccountFormComponent } from '../../auth/components/create-account-form.component';
import { Store } from '@ngxs/store';
import { CreateAccountRequestBody } from '../../auth/auth.interface';
import { CreateAccount } from '../../auth/auth.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CreateAccountFormComponent,
  ],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  private store = inject(Store);

  createAccount(body: CreateAccountRequestBody) {
    this.store.dispatch(new CreateAccount(body));
  }

}
