import { Component, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateAccountRequestBody } from '../auth.interface';

@Component({
  selector: 'app-create-account-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form" (submit)="createAccount()" class="grid gap-4">
      <fieldset>
        <label>Enter full name</label>
        <input type="text" name="displayName" formControlName="displayName" placeholder="John Wick">
      </fieldset>
      <fieldset>
        <label>Enter email</label>
        <input type="email" name="email" formControlName="email" placeholder="john.wick123@example.com">
      </fieldset>
      <fieldset>
        <label class="flex justify-between items-center">
          <span>Enter password</span>
          <span class="cursor-pointer {{ showPassword() && 'text-primary' }}" (click)="toggleShowPassword()"><svg class="w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"/><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"/></svg></span>
        </label>
        <input [type]="showPassword() ? 'text' : 'password'" name="password" formControlName="password" placeholder="your password">
      </fieldset>
      <fieldset>
        <label class="flex justify-between items-center">
          <span>Confirm password</span>
          <span class="cursor-pointer {{ showPassword() && 'text-primary' }}" (click)="toggleShowPassword()"><svg class="w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"/><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"/></svg></span>
        </label>
        <input [type]="showPassword() ? 'text' : 'password'" name="password" formControlName="confirmPassword" placeholder="confirm password">
      </fieldset>
      <div class="grid py-4">
        <button class="btn btn-primary disabled:bg-primary/10 disabled:text-primary" [disabled]="form.invalid" type="submit">Create my account</button>
      </div>
    </form>
  `,
})
export class CreateAccountFormComponent {
  onSubmit = output<CreateAccountRequestBody>();

  form = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  showPassword = signal(false);

  createAccount() {
    if (this.form.valid) {
      this.onSubmit.emit({
        displayName: this.form.value.displayName,
        email: this.form.value.email,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
      });
    }
  }

  toggleShowPassword() {
    this.showPassword.update(v => !v);
  }

}
