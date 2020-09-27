import { Selector } from '@ngxs/store';
import { AuthState } from './auth.state';
import { AuthStateModel } from './auth.state';

export class AuthSelectors {
  @Selector([AuthState])
  static username(state: AuthStateModel) {
    return state?.user?.username;
  }

  @Selector([AuthState])
  static loggedOut(state: AuthStateModel) {
    return !state.user;
  }

  @Selector([AuthState])
  static loggedIn(state: AuthStateModel) {
    return !!state.user;
  }

  @Selector([AuthState])
  static errors(state: AuthStateModel) {
    return state.errors;
  }
}
