import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ConduitApiService } from './../conduit-api.service';
import { Login, Register } from './auth.actions';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../user';
import { throwError } from 'rxjs';

function parseError(err) {
  return Object.keys(err.error.errors).map((key) => `${key} ${err.error.errors[key]}`);
}

export interface AuthStateModel {
  user: User;
  errors: string[];
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    errors: null
  }
})
@Injectable()
export class AuthState {
  constructor(private conduitApi: ConduitApiService) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, { payload }: Login) {
    ctx.patchState({ user: null, errors: null });
    return this.conduitApi.login(payload).pipe(
      tap((user) => ctx.patchState({ user })),
      catchError((err) => {
        ctx.patchState({
          errors: parseError(err)
        });
        return throwError(err);
      })
    );
  }
}
