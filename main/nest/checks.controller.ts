import { Controller, Get, Req, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import axios, { AxiosError } from 'axios'
import { Request, Response } from 'express'
import { buildUrlToPath } from './url'

@ApiTags('checks')
@Controller('checks')
export class ChecksController {
  @Get('readiness')
  async healthCheck(@Req() req: Request, @Res() res: Response) {
    try {
      const url = buildUrlToPath('articles')
      const articles = await axios.get(url)
      res.status(articles.status).send(articles.status === 200)
    } catch (error) {
      if (error instanceof AxiosError) {
        res.status(error.response?.status || 500).send(false)
      }
    }
  }
}
