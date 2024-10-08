import { Injectable } from "@angular/core";
import { Observable, of, switchMap, throwError } from "rxjs";
import { API_URL } from "../../app.constants";
import { HttpResponse } from "../../shared/interfaces/http.interface";
import { DomainService } from "../../shared/services/domain.service";
import { Destination } from "./destination.interface";

@Injectable({ providedIn: 'root' })
export class DestinationService extends DomainService<Destination> {
  override domain = 'destinations';

  findByCode(code: string): Observable<Destination> {
    return this.http.get<HttpResponse<Destination>>(`${API_URL}/${this.domain}/${code}`).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }
}