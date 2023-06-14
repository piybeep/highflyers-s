import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_KEY } from '../decorators/adminOnly.decorator';

@Injectable()
export class AdminOnlyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAdmin = this.reflector.getAllAndOverride<boolean>(
      ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredAdmin) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return user && user.isAdmin;
  }
}
