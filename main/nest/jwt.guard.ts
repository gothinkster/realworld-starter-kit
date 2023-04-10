import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {
  AuthGuard,
  PassportStrategy as NestGuardStrategyFor,
} from '@nestjs/passport'
import { IncomingHttpHeaders } from 'http'
import * as jwt from 'jsonwebtoken'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { Observable } from 'rxjs'
import { getEnvs } from '../environment'

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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
    const { AUDIENCE, TOKEN_PRIVATE_KEY } = getEnvs()
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

export interface User {
  id: number
  email?: string
}

export function getUserFromHeaders(headers: IncomingHttpHeaders): User | null {
  const { AUDIENCE, TOKEN_PRIVATE_KEY } = getEnvs()
  const authorization = headers.authorization

  if (!authorization) {
    return null
  }

  const token = authorization.split(' ')[1]
  const result = jwt.verify(token, TOKEN_PRIVATE_KEY, {
    audience: AUDIENCE,
    complete: true,
  })

  return {
    id: parseInt(result.payload.sub as string),
    email: (result.payload as Record<string, string>).email,
  } as User
}

export function requireUserFromHeaders(headers: IncomingHttpHeaders): User {
  const user = getUserFromHeaders(headers)
  if (user === null) {
    throw new UnauthorizedException()
  }
  return user
}

export function GetUser() {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) =>
    getUserFromHeaders(ctx.switchToHttp().getRequest().headers),
  )()
}

export function RequireUser() {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) =>
    requireUserFromHeaders(ctx.switchToHttp().getRequest().headers),
  )()
}
