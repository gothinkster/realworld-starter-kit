import { Selector } from '@ngxs/store';

import { createPropertySelectors } from '../../ngxs-next';
import { User } from './auth.model';
import { AuthState, AuthStateModel } from './auth.state';

export class AuthSelectors {
  static slices = createPropertySelectors<AuthStateModel>(AuthState);

  @Selector([AuthSelectors.slices.user])
  static username(user: User) {
    return user?.username;
  }

  @Selector([AuthSelectors.slices.user])
  static token(user: User) {
    return user?.token;
  }

  @Selector([AuthSelectors.slices.user])
  static loggedOut(user: User) {
    return !user;
  }

  @Selector([AuthSelectors.slices.user])
  static loggedIn(user: User) {
    return !!user;
  }
}
