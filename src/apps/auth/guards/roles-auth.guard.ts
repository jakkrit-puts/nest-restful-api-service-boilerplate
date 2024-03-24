import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesAuthGard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowRoles = this.reflector.get<string[]>('allowRoles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const result = request?.user?.roles
      .map((role: string) => allowRoles.includes(role))
      .find((rs: boolean) => rs === true);

    if (result) return true;

    throw new UnauthorizedException('Unauthorized.');
  }
}
