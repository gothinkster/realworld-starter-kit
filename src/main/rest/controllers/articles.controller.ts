import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import {
  ArticleCreateDTO,
  ArticleFilters,
  ArticleRequestPayload,
  ArticleResponsePayload,
  ArticlesResponsePayload,
  ArticleUpdateDTO,
} from '../dtos/articles.dto'
import { validateModel } from '../functions.utils'
import { QueryInt } from '../dtos/pagination.dtos'
import { ArticlesService } from '../../domain/articles/articles.service'

@Controller('articles')
export class ArticlesController {
  constructor(private service: ArticlesService) {}
  @Post()
  createArticle(
    @Body(validateModel())
    articlePayload: ArticleRequestPayload<ArticleCreateDTO>,
  ): ArticleResponsePayload {
    return undefined
  }

  @Patch(':slug')
  @Put(':slug')
  updateArticle(
    @Param() slug: string,
    @Body(validateModel())
    articleUpdate: ArticleRequestPayload<ArticleUpdateDTO>,
  ): ArticleResponsePayload {
    return undefined
  }

  @Delete(':slug')
  deleteArticle(@Param() slug: string) {
    return undefined
  }

  @Post(':slug/publication')
  publishArticle(@Param() slug: string) {
    return undefined
  }

  @Delete(':slug/publication')
  unpublishArticle(@Param() slug: string) {
    return undefined
  }

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
