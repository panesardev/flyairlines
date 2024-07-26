import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of, switchMap, tap, throwError } from "rxjs";
import { API_URL } from "../app.constants";
import { StorageService } from "../shared/services/storage.service";
import { AuthResponse, CreateAccountRequest, LoginRequest } from "./auth.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  login(body: LoginRequest): Observable<string> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, body).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.token);
      }),
      tap(token => this.storage.set('token', token)),
    );
  }

  createAccount(body: CreateAccountRequest): Observable<string> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/create-account`, body).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.token);
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