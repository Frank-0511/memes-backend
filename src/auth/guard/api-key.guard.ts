import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request= context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Auth');
    console.log(process.env.API_KEY);
    const isAuth = authHeader === process.env.API_KEY;
    if (!isAuth) {
      throw new UnauthorizedException("Not Authorized");
    }

    return isAuth;
  }
}
