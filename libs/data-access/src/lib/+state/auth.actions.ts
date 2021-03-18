import { LoginRequest, RegisterRequest, UpdateAuthUserRequest } from '../conduit-api.model';

type LoginPayload = LoginRequest;
type RegisterPayload = RegisterRequest;
type UpdateAuthUserPayload = UpdateAuthUserRequest;

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginPayload) {}
}
export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: RegisterPayload) {}
}

export class GetAuthUser {
  static readonly type = '[Auth] GetAuthUser';
  constructor() {}
}

export class UpdateAuthUser {
  static readonly type = '[Auth] UpdateAuthUser';
  constructor(public payload: UpdateAuthUserPayload) {}
}
