import * as jwt from 'jsonwebtoken'
import { InvalidCredentialsError } from './accounts.exceptions'
import { AccountAlreadyExistsException } from './exeptions'
import { AccountEntity } from './accounts.entity'
import { AUDIENCE, TOKEN_PRIVATE_KEY } from '../global/constants'
import { CreateUserDTO } from './accounts.controller'
import { User } from '../nest/jwt.guard'

export class UsersService {
  async createUserAccount(user: CreateUserDTO): Promise<AccountEntity> {
    return await new AccountEntity()
      .changeEmail(user.email)
      .changePassword(user.password)
      .save()
      .catch((err) => {
        throw new AccountAlreadyExistsException(user.email)
      })
  }

  async getUserAccount(user: CreateUserDTO): Promise<AccountEntity> {
    const account = await AccountEntity.findOne({
      where: { email: user.email },
    })
    if (!account || !account.passwordMatch(user.password)) {
      throw new InvalidCredentialsError()
    }
    return account
  }

  getJWTResponse(user: User) {
    return {
      access_token: jwt.sign(
        { account_id: user.id, email: user.email },
        TOKEN_PRIVATE_KEY,
        {
          expiresIn: '24h',
          subject: user.id.toString(),
          issuer: user.id.toString(),
          audience: AUDIENCE,
        },
      ),
    } as const
  }
}
