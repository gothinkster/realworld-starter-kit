import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Axios } from 'axios'
import { GLOBAL_PREFIX } from '../global/constants'

@ApiTags('checks')
@Controller('checks')
export class ChecksController {
  private readonly axios = new Axios({})

  @Get('readiness')
  async healthCheck(@Req() req: Request, @Res() res: Response) {
    const articles = await this.axios.get(
      `${req.protocol}://${req.headers.host}/${GLOBAL_PREFIX}/articles`,
    )
    res.status(articles.status).send(articles.status === 200)
  }
}
