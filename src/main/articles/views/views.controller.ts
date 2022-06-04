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

  @AuthIsOptional()
  @Get()
  async getManyArticles(
    @Req() req: { user: AccountType },
    @Query(validateModel()) filters: ArticleFilters,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): Promise<{ articles: ArticleResponseDTO[] }> {
    const user = await this.profiles.getProfile({ account: req.user })
    const view = await this.articles.getViews(user)
    const articles = await view.getArticlesByFilters(filters, limit, offset)
    return {
      articles: articles.map((article) => {
        return {
          ...article.createSnapshot(),
          author: user.createSnapshot(),
          favoritesCount: 0,
        }
      }),
    }
  }

  @Get('feed')
  async getFeed(
    @Req() req: { user: AccountType },
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): Promise<{ articles: ArticleResponseDTO[] }> {
    const user = await this.profiles.getProfile({ account: req.user })
    const view = await this.articles.getViews(user)
    const articles = await view.getFeed(limit, offset)
    return {
      articles: articles.map((article) => {
        return {
          ...article.createSnapshot(),
          author: user.createSnapshot(),
          favoritesCount: 0,
        }
      }),
    }
  }

  @AuthIsOptional()
  @Get(':slug')
  async getArticle(
    @Req() req: { user: AccountType },
    @Param('slug') slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    const user = await this.profiles.getProfile({ account: req.user })
    const article = await this.articles.getViews(user).getArticle(slug)
    return {
      article: {
        ...article.createSnapshot(),
        author: user.createSnapshot(),
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
