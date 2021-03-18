import { User } from './user';

export interface TagsResponse {
  tags: string[];
}

export interface LoginResponse {
  user: User;
}

export interface GetCurrentUserResponse {
  user: User;
}

export interface UpdateCurrentUserResponse {
  user: User;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface UpdateAuthUserRequest {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}
