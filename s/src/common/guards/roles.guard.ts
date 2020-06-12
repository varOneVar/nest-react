import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  // private readonly reflector: Reflector
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Observable<boolean> | Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) return true
    const request = context.switchToHttp().getRequest()
    console.log(request.user, 444)
    const user = request.user
    const hasRole = () => user.roles.some(role => roles.includes(role))
    return user && user.roles && hasRole()
  }
}