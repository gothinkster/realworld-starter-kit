import { AccountEntity } from './account.entity'
import * as jwt from 'jsonwebtoken'

export function createTokenForAccount(account: AccountEntity): string {
  return jwt.sign(
    { account_id: account.getAccountID(), email: account.email },
    process.env.TOKEN_PRIVATE_KEY || "TOKEN_PRIVATE_KEY",
    {
      expiresIn: '24h',
      subject: account.getAccountID().toString(),
      issuer: account.getAccountID().toString(),
    },
  )
}
