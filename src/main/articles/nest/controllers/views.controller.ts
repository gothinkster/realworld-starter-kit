import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { ArticlesService } from '../../articles.service'
import { ProfilesService } from '../../../profiles/profiles.service'
import { QueryInt, validateModel } from '../../../utils/validation.utils'
import {
  ArticleFilters,
  ArticleResponsePayload,
  ArticlesResponsePayload,
} from '../dtos/articles.dto'

@Controller('articles')
export class ArticlesViewsController {
  constructor(
    private articles: ArticlesService,
    private profiles: ProfilesService,
  ) {}

  @Get()
  getManyArticles(
    @QueryInt('limit', 20) limit: number,
    @QueryInt('offset', 0) offset: number,
    @Query(validateModel()) filters: ArticleFilters,
  ): ArticlesResponsePayload {
    return undefined
  }

  @Get('feed')
  getFeed(
    @QueryInt('limit', 20) limit: number,
    @QueryInt('offset', 0) offset: number,
  ): ArticlesResponsePayload {
    return undefined
  }

  @Get(':slug')
  getArticle(@Param() slug: string): ArticleResponsePayload {
    return undefined
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
