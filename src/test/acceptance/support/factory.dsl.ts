import { RealWorldDSL } from './realworld.dsl'
import { RESTDriver } from './RESTDriver'

export async function dslFactory(): Promise<RealWorldDSL> {
  return new RealWorldDSL(new RESTDriver())
}
