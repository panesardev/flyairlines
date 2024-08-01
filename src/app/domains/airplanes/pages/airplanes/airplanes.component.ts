import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ModalService } from '../../../../layout/modals/modal.service';
import { FindAirplaneByModel } from '../../airplane.actions';
import { Airplane } from '../../airplane.interface';
import { AirplaneState } from '../../airplane.state';
import { AirplaneListComponent } from "../../components/airplane-list.component";

@Component({
  selector: 'app-airplanes',
  standalone: true,
  templateUrl: './airplanes.component.html',
  imports: [AirplaneListComponent],
})
export default class AirplanesComponent {
  private store = inject(Store);
  private modal = inject(ModalService);

  airplanes = this.store.selectSignal(AirplaneState.airplanes);

  create() {
    const fn = () => import('../../components/create.component').then(c => c.CreateComponent);
    this.modal.open(fn);
  }

  update(airplane: Airplane) {
    const fn = () => import('../../components/update.component').then(c => c.UpdateComponent);
    this.store.dispatch(new FindAirplaneByModel(airplane.model));
    this.modal.open(fn);
  }
  
  remove(airplane: Airplane) {
    const fn = () => import('../../components/remove.component').then(c => c.RemoveComponent);
    this.store.dispatch(new FindAirplaneByModel(airplane.model));
    this.modal.open(fn);
  }
}
