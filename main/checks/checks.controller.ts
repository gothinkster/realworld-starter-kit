import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Axios } from 'axios'
import { API_PORT, GLOBAL_PREFIX } from '../global/constants'

@ApiTags('checks')
@Controller('checks')
export class ChecksController {
  private readonly axios = new Axios({
    baseURL: `http://localhost:${API_PORT}/${GLOBAL_PREFIX}`,
    responseType: 'json',
    transformRequest: (data) => (data ? JSON.stringify(data) : data),
    transformResponse: (data) => (data ? JSON.parse(data) : data),
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: (status) => status < 500,
  })

  @Get('readiness')
  async healthCheck(@Res() response: Response) {
    const articles = await this.axios.get('/articles')
    response.status(articles.status).send('Ok')
  }
}
