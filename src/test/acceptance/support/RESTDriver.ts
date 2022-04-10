import { ProtocolDriver } from './interface.driver'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../../main/app.module'

export class RESTDriver implements ProtocolDriver {
  private app: INestApplication

  public async init(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    this.app = moduleFixture.createNestApplication()
    await this.app.init()
  }
  public async stop(): Promise<void> {
    await this.app.close()
  }
}
