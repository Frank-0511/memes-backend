import { User } from 'src/users/user.entity';

export interface UserLogin extends User {
  access_token: string;
}
