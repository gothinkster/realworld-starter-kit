import {
  applyDecorators,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

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

export function Auth(optional = false) {
  const decorators = [
    UseGuards(JWTAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  ]
  if (optional) {
    decorators.push(AuthIsOptional())
  }
  return applyDecorators(...decorators)
}
