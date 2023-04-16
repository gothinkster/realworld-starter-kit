import { UserDSL } from './UserDSL'
import { UserDriver } from './UserDriver'
import { UserRestDriver } from './UserRestDriver'
import { UserTrpcDriver } from './UserTrpcDriver'

const driverClasses = {
  trpc: UserTrpcDriver,
  rest: UserRestDriver,
} as const

function createDriver(): UserDriver {
  const DRIVER = process.env.DRIVER?.toLowerCase()
  const DriverClass = driverClasses[DRIVER as keyof typeof driverClasses]
  if (!DriverClass) {
    throw new Error(`Unknown driver: ${DRIVER}`)
  }
  return new DriverClass()
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
