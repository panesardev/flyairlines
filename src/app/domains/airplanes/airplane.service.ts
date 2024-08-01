import { Injectable } from "@angular/core";
import { Observable, of, switchMap, throwError } from "rxjs";
import { API_URL } from "../../app.constants";
import { HttpResponse } from "../../shared/interfaces/http.interface";
import { DomainService } from "../../shared/services/domain.service";
import { Airplane } from "./airplane.interface";

@Injectable({ providedIn: 'root' })
export class AirplaneService extends DomainService<Airplane> {
  override domain = 'airplanes';

  findByModel(model: string): Observable<Airplane> {
    return this.http.get<HttpResponse<Airplane>>(`${API_URL}/${this.domain}/${model}`).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }
}
