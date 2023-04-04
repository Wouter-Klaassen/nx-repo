
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { stringify } from 'querystring';
import { Role } from './roles/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    // const {user} = context.switchToHttp().getRequest();
    const {user} = context.switchToHttp().getRequest()
    console.log("roles : " + roles)
    console.log("user : " + user)
    return roles.some((role) => user.roles?.includes(role));

  }
}

function matchRoles(roles: string[], userRoles: any): boolean {
  
  let match = false

  for(const userRole of userRoles){
    for(const role of roles){
      if (role == userRole) {
        match = true
      }
    }
  }
  
  
  return match
}
