import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { EntityManager } from 'typeorm'
import { getEnvs } from '../environment'

@ApiTags('checks')
@Controller('checks')
export class ChecksController {
  constructor(private readonly entityManager: EntityManager) {}

  @Get('readiness')
  @HttpCode(HttpStatus.OK)
  async getReadiness() {
    const { VERSION } = getEnvs()
    const res = await this.entityManager.query('SELECT 1')
    const ready = res.length === 1 && res[0]['1'] === '1'
    return {
      version: VERSION,
      ready,
    }
  }
}
