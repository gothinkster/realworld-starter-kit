import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  GetCurrentUserResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  TagsResponse,
  UpdateAuthUserRequest,
  UpdateCurrentUserResponse
} from './conduit-api.model';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class ConduitApiService {
  readonly baseUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private store: Store) {}

  getTags() {
    return this.http.get<TagsResponse>(`${this.baseUrl}/tags`).pipe(map((response) => response.tags));
  }

  login(loginRequest: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/users/login`, { user: loginRequest })
      .pipe(map((response) => response.user));
  }

  register(registerRequest: RegisterRequest) {
    return this.http
      .post<RegisterResponse>(`${this.baseUrl}/users`, { user: registerRequest })
      .pipe(map((response) => response.user));
  }

  getAuthUser() {
    return this.http
      .get<GetCurrentUserResponse>(`${this.baseUrl}/user`, {
        headers: this.headers()
      })
      .pipe(map((response) => response.user));
  }

  private headers() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${this.store.selectSnapshot((s) => s.auth?.user?.token)}`
    };
  }

  updateAuthUser(updateAuthUserRequest: UpdateAuthUserRequest) {
    return this.http
      .put<UpdateCurrentUserResponse>(`${this.baseUrl}/user`, updateAuthUserRequest, { headers: this.headers() })
      .pipe(map((response) => response.user));
  }
}
