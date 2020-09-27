import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginRequest, RegisterRequest, TagsResponse } from './conduit-api.model';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ConduitApiService {
  readonly baseUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) {}

  getTags() {
    return this.http.get<TagsResponse>(`${this.baseUrl}/tags`).pipe(map((response) => response.tags));
  }

  login(loginRequest: LoginRequest) {
    return this.http
      .post<User>(`${this.baseUrl}/users/login`, { user: loginRequest })
      .pipe(map((response) => response));
  }

  register(registerRequest: RegisterRequest) {
    return this.http
      .post<User>(`${this.baseUrl}/users`, { user: registerRequest })
      .pipe(map((response) => response));
  }
}
