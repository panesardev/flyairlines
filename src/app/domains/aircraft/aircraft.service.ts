import { Injectable } from "@angular/core";
import { Observable, of, switchMap, throwError } from "rxjs";
import { API_URL } from "../../app.constants";
import { HttpResponse } from "../../shared/interfaces/http.interface";
import { DomainService } from "../../shared/services/domain.service";
import { Aircraft } from "./aircraft.interface";

@Injectable({ providedIn: 'root' })
export class AircraftService extends DomainService<Aircraft> {
  override domain = 'aircraft';

  findByModel(model: string): Observable<Aircraft> {
    return this.http.get<HttpResponse<Aircraft>>(`${API_URL}/${this.domain}/${model}`).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }
}
