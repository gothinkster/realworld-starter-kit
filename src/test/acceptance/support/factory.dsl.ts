import { RealWorldDSL } from './realworld.dsl'
import { NestAppDriver } from './nestapp.driver'

export async function dslFactory(): Promise<RealWorldDSL> {
  return new RealWorldDSL(new NestAppDriver())
}
