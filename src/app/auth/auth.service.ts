import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of, switchMap, tap, throwError } from "rxjs";
import { API_URL } from "../app.constants";
import { StorageService } from "../shared/services/storage.service";
import { CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";
import { HttpResponse } from "../shared/interfaces/http.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  login(body: LoginRequestBody): Observable<string> {
    return this.http.post<HttpResponse<string>>(`${API_URL}/auth/login`, body).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
      tap(token => this.storage.set('token', token)),
    );
  }

  createAccount(body: CreateAccountRequestBody): Observable<string> {
    return this.http.post<HttpResponse<string>>(`${API_URL}/auth/create-account`, body).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
      tap(token => this.storage.set('token', token)),
    );
  }

  logout(): void {
    this.storage.remove('token');
  }

  getToken(): string {
    return this.storage.get('token');
  }

}