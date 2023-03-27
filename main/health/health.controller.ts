import { Controller, Get, Res } from '@nestjs/common'
import { ArticlesService } from '../articles/articles.service'

@Controller('checks')
export class HealthController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('readiness')
  async healthCheck(@Res() res) {
    await this.articlesService.getView().getArticlesByFilters({})
    return res.status(200)
  }
}
