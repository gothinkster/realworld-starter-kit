import { AppConnection } from './interface'
import { connectToRest } from './rest'

const connectionFactories: { [key: string]: () => Promise<AppConnection> } = {
  rest: connectToRest,
}

export async function connectToApp() {
  const protocolDriver: string = process.env.DRIVER?.toLowerCase() || 'rest'
  return await connectionFactories[protocolDriver]()
}
