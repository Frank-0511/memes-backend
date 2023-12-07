import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../models/token.model';
import { User } from 'src/users/user.entity';
import { UserLogin } from '../models/login.model';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserLogin> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return this.generateJWT(user);
    return null;
  }

  generateJWT(user: User): UserLogin {
    const payload: PayloadToken = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }
}
