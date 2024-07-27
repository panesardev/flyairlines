import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequestBody } from '../auth.interface';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form" (submit)="login()" class="grid gap-4">
      <fieldset>
        <label>Enter email</label>
        <input type="email" name="email" formControlName="email" placeholder="john.wick123@example.com">
      </fieldset>
      <fieldset>
        <label>Enter password</label>
        <input type="password" name="password" formControlName="password" placeholder="your password">
      </fieldset>
      <div class="grid py-4">
        <button class="btn btn-primary disabled:bg-primary/10 disabled:text-primary" [disabled]="form.invalid" type="submit">Login</button>
      </div>
    </form>
  `,
})
export class LoginFormComponent {
  onSubmit = output<LoginRequestBody>();

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  login() {
    if (this.form.valid) {
      this.onSubmit.emit({
        email: this.form.value.email,
        password: this.form.value.password,
      });
    }
  }
}
