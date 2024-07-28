import { Injectable } from "@angular/core";
import { DomainService } from "../../shared/services/domain.service";
import { Passenger } from "./passenger.interface";

@Injectable({ providedIn: 'root' })
export class PassengerService extends DomainService<Passenger> {
  override domain = 'passengers';
}
