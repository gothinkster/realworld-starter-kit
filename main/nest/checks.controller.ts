import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import axios, { AxiosError } from 'axios'
import { Response } from 'express'
import * as path from 'path'
import { getEnvs } from '../environment'

@ApiTags('checks')
@Controller('checks')
export class ChecksController {
  @Get('readiness')
  async getReadiness(@Res() res: Response) {
    try {
      const { API_PREFIX, API_PORT } = getEnvs()
      const url = `http://localhost:${path.join(
        String(API_PORT),
        API_PREFIX,
        'articles',
      )}`
      const articles = await axios.get(url)
      res.status(articles.status).send(articles.status === 200)
    } catch (error) {
      if (error instanceof AxiosError) {
        res.status(error.response?.status || 500).send(false)
      }
    }
  }

  @Get('version')
  @HttpCode(HttpStatus.OK)
  getVersion() {
    const { VERSION } = getEnvs()
    return VERSION
  }
}
