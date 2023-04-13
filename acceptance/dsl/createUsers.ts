import { UserDSL } from './UserDSL'
import { UserDriver } from './UserDriver'
import { UserTrpcDriver } from './UserTrpcDriver'

function createDriver(): UserDriver {
  if (process.env.DRIVER === 'trpc') {
    return new UserTrpcDriver()
  }
  return new UserTrpcDriver()
}

export function createUsers() {
  const context = {}
  const randomNumber = Date.now()
  const abbott = new UserDSL(`Abbott-${randomNumber}`, createDriver(), context)
  const costello = new UserDSL(
    `Costello-${randomNumber}`,
    createDriver(),
    context,
  )
  const guest = new UserDSL(`Guest-${randomNumber}`, createDriver(), context)
  return {
    abbott,
    costello,
    guest,
  }
}
