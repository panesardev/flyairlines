import { Injectable } from "@angular/core";
import { Observable, of, switchMap, throwError } from "rxjs";
import { API_URL } from "../../app.constants";
import { HttpResponse } from "../../shared/interfaces/http.interface";
import { DomainService } from "../../shared/services/domain.service";
import { Flight } from "./flight.interface";

@Injectable({ providedIn: 'root' })
export class FlightService extends DomainService<Flight> {
  override domain = 'flights';

  findByNumber(number: string): Observable<Flight> {
    return this.http.get<HttpResponse<Flight>>(`${API_URL}/${this.domain}/${number}`).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }
}
