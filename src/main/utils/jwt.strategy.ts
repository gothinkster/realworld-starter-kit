import { Injectable } from '@nestjs/common'
import { PassportStrategy as NestGuardStrategyFor } from '@nestjs/passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { AUDIENCE, TOKEN_PRIVATE_KEY } from '../constants'

export interface AccountType {
  id: number
  email: string
}

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

  async validate(payload: any): Promise<AccountType> {
    // To add here:
    //  - Additional validation
    //  - Remote token introspection, Therefore, we should get access to required roles.
    // console.log('Calling validate from JWTAuthPassport')
    return { id: parseInt(payload.sub), email: payload.email }
  }
}
