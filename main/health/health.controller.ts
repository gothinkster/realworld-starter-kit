import { Controller, Get } from '@nestjs/common'
import { Axios } from 'axios'
import { GLOBAL_PREFIX } from '../constants'

@Controller('health')
export class HealthController {
  private axios = new Axios({
    baseURL: `http://localhost:3000/${GLOBAL_PREFIX}`,
    responseType: 'json',
    transformRequest: (data) => (data ? JSON.stringify(data) : data),
    transformResponse: (data) => (data ? JSON.parse(data) : data),
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: (status) => status < 500,
  })

  @Get()
  async healthCheck() {
    const articlesResponse = await this.axios.get('articles')
    return articlesResponse.status === 200
  }
}
