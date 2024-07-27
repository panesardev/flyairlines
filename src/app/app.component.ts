import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RenderModalComponent } from './layout/modals/render-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    RenderModalComponent,
  ],
  template: `
    <app-navbar>
      <main class="px-6 py-8">
        <router-outlet />
      </main>
    </app-navbar>
    @defer {
      <app-footer />
      <app-render-modal />
    }
  `,
})
export class AppComponent {

}
