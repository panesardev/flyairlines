import { Component } from '@angular/core';
import { BRAND } from '../../app.constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  brand = BRAND;
}
