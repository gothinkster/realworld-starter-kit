import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context)
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // You can throw an exception based on either "info" or "err" arguments
    // console.log('Calling handleRequest from JWTAuthGuard')
    const userIsOptional = this.reflector.get<boolean | null>(
      authIsOptionalString,
      context.getHandler(),
    )
    if (!user && userIsOptional) {
      console.log('Entering userIsOptional block.')
      return null
    }
    return super.handleRequest(err, user, info, context)
  }
}

const authIsOptionalString = 'authIsOptional'
export const AuthIsOptional = () => SetMetadata(authIsOptionalString, true)
