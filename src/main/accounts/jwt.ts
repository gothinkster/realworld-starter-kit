import { AccountEntity } from './entity'

export function createTokenForAccount(account: AccountEntity): string {
  return account.getSubject()
}
