import { User } from 'src/users/user.entity';

export interface UserLogin extends User {
  access_token: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  email: string;
  name: string;
};
