import { World } from '@cucumber/cucumber'

export default class RealWorld extends World {
  private driver: ProtocolDriver
  public init(scenario, driver: ProtocolDriver): void {
    this.driver = driver
  }
  public getDriver(): ProtocolDriver {
    return this.driver
  }
}

export interface ProtocolDriver {}

export class NestJSInternalDriver implements ProtocolDriver {}
