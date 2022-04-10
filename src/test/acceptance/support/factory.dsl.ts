import { RealWorldDSL } from './realworld.dsl'
import { RestDriver } from './rest.driver'

export async function dslFactory(): Promise<RealWorldDSL> {
  const driver = new RestDriver()
  await driver.init()
  return new RealWorldDSL(driver)
}
