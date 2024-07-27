import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpResponse } from "../../shared/interfaces/http.interface";
import { Destination } from "./destination.interface";
import { API_URL } from "../../app.constants";
import { of, switchMap, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class destinationService {
  private http = inject(HttpClient);

  destinations$ = this.http.get<HttpResponse<Destination[]>>(`${API_URL}/destinations`).pipe(
    switchMap(response => {
      if (response.errored) {
        return throwError(() => new Error(response.message));
      }
      return of(response.payload);
    }),
  );
  
}