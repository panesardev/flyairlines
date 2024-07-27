import { Component } from '@angular/core';
import { select } from '@ngxs/store';
import { AuthStateToken } from '../../../../auth/auth.state';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    JsonPipe,
  ],
  templateUrl: './profile.component.html',
})
export default class ProfileComponent {

  authState = select(AuthStateToken);

}
