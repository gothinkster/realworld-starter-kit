import { UserDSL } from './UserDSL'
import { UserDriver } from './UserDriver'
import { UserRestDriver } from './UserRestDriver'
import { UserTrpcDriver } from './UserTrpcDriver'

function createDriver(): UserDriver {
  if (process.env.DRIVER === 'trpc') {
    return new UserTrpcDriver()
  }
  if (process.env.DRIVER === 'rest') {
    return new UserRestDriver()
  }
  throw new Error(`Unknown driver: ${process.env.DRIVER}`)
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
