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
    await this.entityManager.query('SELECT 1')
    return true
  }

  @Get('version')
  @HttpCode(HttpStatus.OK)
  async getVersion() {
    return getEnvs().VERSION
  }
}
