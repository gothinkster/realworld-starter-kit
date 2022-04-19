import * as jwt from 'jsonwebtoken'
import { AUDIENCE, TOKEN_PRIVATE_KEY } from '../../constants'
import { AccountEntity } from './account.entity'

export function createTokenForAccount(account: AccountEntity): string {
  return jwt.sign(
    { account_id: account.getAccountID(), email: account.email },
    TOKEN_PRIVATE_KEY,
    {
      expiresIn: '24h',
      subject: account.getAccountID().toString(),
      issuer: account.getAccountID().toString(),
      audience: AUDIENCE,
    },
  )
}
