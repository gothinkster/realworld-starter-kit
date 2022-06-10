import { ProtocolDriver } from './protocol.driver'
import { connectToRest } from './rest'

export interface AppConnection {
  driverFactory(): ProtocolDriver
  stop(): Promise<void>
}

const connectionFactories: { [key: string]: () => Promise<AppConnection> } = {
  rest: connectToRest,
}

export async function connectToApp() {
  const protocolDriver: string = process.env.DRIVER?.toLowerCase() || 'rest'
  return await connectionFactories[protocolDriver]()
}
