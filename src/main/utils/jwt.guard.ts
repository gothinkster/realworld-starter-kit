import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    console.log('Calling canActivate from JWTAuthGuard')
    return super.canActivate(context)
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log('Calling handleRequest from JWTAuthGuard')
    return super.handleRequest(err, user, info, context)
  }
}

export const UserIsOptional = () => SetMetadata('userIsOptional', true)

export const RequireRoles = (...roles: string[]) => SetMetadata('roles', roles)
enum Roles {
  manageArticle = 'articles:create',
  viewArticle = 'articles:view',
}
