import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, of, switchMap, throwError } from "rxjs";
import { API_URL } from "../../app.constants";
import { HttpResponse } from "../interfaces/http.interface";

export class DomainService<T> {
  protected http = inject(HttpClient);
  protected domain = '';
  
  findAll(): Observable<T[]> {
    return this.http.get<HttpResponse<T[]>>(`${API_URL}/${this.domain}`).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }

  findById(id: number): Observable<T> {
    return this.http.get<HttpResponse<T>>(`${API_URL}/${this.domain}/${id}`).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }

  create(payload: T): Observable<T> {
    return this.http.post<HttpResponse<T>>(`${API_URL}/${this.domain}`, { payload }).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }
  
  update(payload: T): Observable<T> {
    return this.http.patch<HttpResponse<T>>(`${API_URL}/${this.domain}`, { payload }).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }

  remove(id: number): Observable<boolean> {
    return this.http.delete<HttpResponse<boolean>>(`${API_URL}/${this.domain}/${id}`).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }

}