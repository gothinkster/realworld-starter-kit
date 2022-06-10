import { ProtocolDriver } from './protocol.driver'
import { connectToRest } from './rest'

export interface AppConnection {
  driverFactory(): ProtocolDriver
  stop(): Promise<void>
}

const connections: { [key: string]: () => Promise<AppConnection> } = {
  rest: connectToRest,
}

export const connectToApp = connections[process.env.TEST_DRIVER || 'rest']
