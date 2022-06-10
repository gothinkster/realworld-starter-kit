import { Injectable } from '@nestjs/common'
import { PassportStrategy as NestGuardStrategyFor } from '@nestjs/passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { AUDIENCE, TOKEN_PRIVATE_KEY } from '../../constants'
import { Account } from '../../domain/authors/models'

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

  async validate(payload: any): Promise<Account> {
    return { id: parseInt(payload.sub), email: payload.email }
  }
}
