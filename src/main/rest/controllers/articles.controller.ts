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
import { Pagination } from '../dtos/pagination.dtos'
import { validateModel } from '../functions.utils'

@Controller('articles')
export class ArticlesController {
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
    @Param('slug') articleSlug: string,
    @Body(validateModel())
    articleUpdate: ArticleRequestPayload<ArticleUpdateDTO>,
  ): ArticleResponsePayload {
    return undefined
  }

  @Delete(':slug')
  deleteArticle(@Param('slug') articleSlug: string) {
    return undefined
  }

  @Post(':slug/publication')
  publishArticle(@Param('slug') articleSlug: string) {
    return undefined
  }

  @Delete(':slug/publication')
  unpublishArticle(@Param('slug') articleSlug: string) {
    return undefined
  }

  @Get()
  getManyArticles(
    @Query(validateModel()) filters: ArticleFilters,
    @Query(validateModel()) pagination: Pagination,
  ): ArticlesResponsePayload {
    return undefined
  }

  @Get(':slug')
  getArticle(@Param('slug') articleSlug: string): ArticleResponsePayload {
    return undefined
  }

  @Get('feed')
  getFeed(
    @Query(validateModel()) pagination: Pagination,
  ): ArticlesResponsePayload {
    return undefined
  }

  @Post(':slug/favorite')
  favoriteArticle(@Param('slug') articleSlug: string) {
    return undefined
  }

  @Delete(':slug/favorite')
  unfavoriteArticle(@Param('slug') articleSlug: string) {
    return undefined
  }
}
