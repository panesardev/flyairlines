import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar>
      <main class="p-6">
        <router-outlet />
      </main>
    </app-navbar>
    <app-footer />
  `,
})
export class AppComponent {

}
