import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of, switchMap, throwError } from "rxjs";
import { API_URL } from "../app.constants";
import { HttpResponse } from "../shared/interfaces/http.interface";
import { StorageService } from "../shared/services/storage.service";
import { CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";

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
        this.storage.set('token', response.payload);
        return of(response.payload);
      }),
    );
  }

  createAccount(body: CreateAccountRequestBody): Observable<string> {
    return this.http.post<HttpResponse<string>>(`${API_URL}/auth/create-account`, body).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        this.storage.set('token', response.payload);
        return of(response.payload);
      }),
    );
  }

  logout(): void {
    this.storage.remove('token');
  }

  getToken(): string {
    return this.storage.get('token');
  }

}