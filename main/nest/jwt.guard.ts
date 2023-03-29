import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {
  AuthGuard,
  PassportStrategy as NestGuardStrategyFor,
} from '@nestjs/passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { AUDIENCE, TOKEN_PRIVATE_KEY } from '../global/constants'
import { User } from '../accounts/accounts.controller'

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
      return null
    }
    return super.handleRequest(err, user, info, context)
  }
}

const authIsOptionalString = 'authIsOptional'
export const AuthIsOptional = () => SetMetadata(authIsOptionalString, true)

@Injectable()
export class JWTAuthPassport extends NestGuardStrategyFor(JWTStrategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience: AUDIENCE,
      secretOrKey: TOKEN_PRIVATE_KEY,
    })
  }

  async validate(payload: any): Promise<User> {
    return { id: parseInt(payload.sub), email: payload.email }
  }
}
