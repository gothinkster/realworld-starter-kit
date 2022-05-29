import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ProfilesService } from '../../profiles/profiles.service'
import { AuthIsOptional, JWTAuthGuard } from '../../utils/jwt.guard'
import { AccountType } from '../../utils/jwt.strategy'
import { QueryInt, validateModel } from '../../utils/validation.utils'
import { ArticleFilters, ArticleResponseDTO } from '../articles.dto'
import { ArticlesService } from '../articles.service'

@ApiTags('articles')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('articles')
export class ArticlesViewsController {
  constructor(
    private articles: ArticlesService,
    private profiles: ProfilesService,
  ) {}

  @Get()
  getManyArticles(
    @Query(validateModel()) filters: ArticleFilters,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ) {
    return undefined
  }

  @Get('feed')
  getFeed(
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ) {
    return undefined
  }

  @AuthIsOptional()
  @Get(':slug')
  async getArticle(
    @Req() req: { user: AccountType },
    @Param('slug') slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    const author = await this.profiles.getProfile({ account: req.user })
    const article = await this.articles.getViews(author).getArticle(slug)
    return {
      article: {
        ...article.createSnapshot(),
        author: author.createSnapshot(),
        favoritesCount: 0,
      },
    }
  }

  @Post(':slug/favorite')
  favoriteArticle(@Param() slug: string) {
    return undefined
  }

  @Delete(':slug/favorite')
  unfavoriteArticle(@Param() slug: string) {
    return undefined
  }
}
