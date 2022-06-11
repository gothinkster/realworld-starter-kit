import { UserDriver } from '../drivers/interface.driver'

export interface AppConnection {
  createUserDriver(): UserDriver
  stop(): Promise<void>
}
