import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { ConduitApiService } from '../conduit-api.service';
import { GetAuthUser, Login, Register, UpdateAuthUser } from './auth.actions';

import type { AuthStateModel } from './auth.model';

function parseError(err) {
  return Object.keys(err.error.errors).map((key) => `${key} ${err.error.errors[key]}`);
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

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, { payload }: Register) {
    ctx.patchState({ user: null, errors: null });
    return this.conduitApi.register(payload).pipe(
      tap((user) => ctx.patchState({ user })),
      catchError((err) => {
        ctx.patchState({
          errors: parseError(err)
        });
        return throwError(err);
      })
    );
  }

  @Action(GetAuthUser)
  getAuthUser(ctx: StateContext<AuthStateModel>) {
    return this.conduitApi.getAuthUser().pipe(
      tap((user) => {
        ctx.patchState({ user });
      })
    );
  }

  @Action(UpdateAuthUser)
  updateAuthUser(ctx: StateContext<AuthStateModel>, { payload }: UpdateAuthUser) {
    return this.conduitApi.updateAuthUser(payload).pipe(tap(() => ctx.patchState({ user: payload })));
  }
}
