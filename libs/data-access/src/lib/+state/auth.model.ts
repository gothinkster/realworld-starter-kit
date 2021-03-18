export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface AuthStateModel {
  user: User;
  errors: string[];
}
