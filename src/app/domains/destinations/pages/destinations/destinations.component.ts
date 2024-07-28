import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { select } from '@ngxs/store';
import { map } from 'rxjs';
import { AppStateToken } from '../../../../app.state';
import { DestinationCardComponent } from '../../components/destination-card.component';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [
    DestinationCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './destinations.component.html',
})
export default class DestinationsComponent {
  private state = select(AppStateToken);

  searchControl = new FormControl('');

  text = toSignal(this.searchControl.valueChanges.pipe(map(text => text.toLowerCase())));

  destinations = computed(() => {
    if (this.text()) {
      return this.state().destinations.filter(destination => {
        return destination.name.toLowerCase().includes(this.text());
      });
    }
    return this.state().destinations;
  });

}
