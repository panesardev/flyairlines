import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DestinationCardComponent } from '../../components/destination-card.component';
import { DestinationState } from '../../destination.state';
import { Destination } from '../../destination.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DestinationCardComponent,
  ],
  templateUrl: './destinations.component.html',
})
export default class DestinationsComponent {
  private store = inject(Store);

  _destinations = this.store.selectSignal(DestinationState.destinations);

  searchControl = new FormControl('');

  text = toSignal(this.searchControl.valueChanges);

  destinations = computed(() => {
    if (this.text()) {
      return this._destinations().filter(destination => {
        return destination.name.toLowerCase().includes(this.text().toLowerCase());
      });
    }
    return this._destinations();
  });

  select(destination: Destination) {
    // this.store.dispatch(new NewFlightDestinationTo(destination));
  }
}
