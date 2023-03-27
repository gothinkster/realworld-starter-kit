import { Controller, Get, Res } from '@nestjs/common'
import { Axios } from 'axios'
import { API_PORT, GLOBAL_PREFIX } from '../global/constants'

@Controller('health')
export class HealthController {
  private axios = new Axios({
    baseURL: `http://localhost:${API_PORT}/${GLOBAL_PREFIX}`,
    responseType: 'json',
    transformRequest: (data) => (data ? JSON.stringify(data) : data),
    transformResponse: (data) => (data ? JSON.parse(data) : data),
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: (status) => status < 500,
  })

  @Get()
  async healthCheck(@Res() res) {
    const articlesResponse = await this.axios.get('articles')
    return res.status(articlesResponse.status)
  }
}
