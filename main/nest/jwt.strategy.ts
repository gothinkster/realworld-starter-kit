import { Injectable } from '@nestjs/common'
import { PassportStrategy as NestGuardStrategyFor } from '@nestjs/passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { Account } from '../authors/models'
import { AUDIENCE, TOKEN_PRIVATE_KEY } from '../global/constants'

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
