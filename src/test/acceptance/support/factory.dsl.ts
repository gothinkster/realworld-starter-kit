import { ProtocolDriver } from './interface.driver'
import { RestDriver } from './rest.driver'

export function getDriver(): ProtocolDriver {
  return new RestDriver()
}
