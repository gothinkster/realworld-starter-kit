import { UserDSL } from './UserDSL'
import { UserRestDriver } from './UserRestDriver'

export function createUsers() {
  const context = {}
  const randomNumber = Date.now()
  const abbott = new UserDSL(
    `Abbott-${randomNumber}`,
    new UserRestDriver(),
    context,
  )
  const costello = new UserDSL(
    `Costello-${randomNumber}`,
    new UserRestDriver(),
    context,
  )
  const guest = new UserDSL(
    `Guest-${randomNumber}`,
    new UserRestDriver(),
    context,
  )
  return {
    abbott,
    costello,
    guest,
  }
}
