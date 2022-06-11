import { UserDriver } from '../drivers/interface.driver'

export interface AppConnection {
  driverFactory(): UserDriver
  stop(): Promise<void>
}
