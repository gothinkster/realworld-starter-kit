import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Account } from '../authors/models'
import { AuthorsService } from '../authors/service'
import {
  ArticleFiltersDTO,
  ArticleResponseBody,
  ArticlesResponseBody,
  cloneArticleToOutput,
  CreateArticleBody,
  createLinksForArticle,
  Slug,
  UpdateArticleBody,
} from './articles.dto'

import { ArticlesService } from './articles.service'
import { InjectAccount } from '../accounts/account.decorator'
import { PaginationDTO } from '../nest/pagination.dto'
import { buildUrl } from '../nest/url'
import { AuthIsOptional, JWTAuthGuard } from '../nest/jwt.guard'
import { validateModel } from '../nest/validation.utils'

@ApiTags('articles')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(
    private articlesService: ArticlesService,
    private authorsService: AuthorsService,
  ) {}

  @ApiOkResponse({ type: ArticlesResponseBody })
  @Get('feed')
  async getFeed(
    @Req() req,
    @InjectAccount() account: Account,
    @Query(validateModel()) pagination: PaginationDTO,
  ): Promise<ArticlesResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const articles = await this.articlesService.getView(me).getFeed(pagination)

    const response: ArticlesResponseBody = {
      articles: articles.map((article) => {
        return cloneArticleToOutput(
          req,
          article,
          undefined,
          createLinksForArticle(req, article),
        )
      }),
    }
    if (articles.length > 0) {
      response.links = {
        next: buildUrl(
          req,
          'articles/feed',
          pagination.getNextPage().toParams(),
        ),
      }
    }
    return response
  }

  @ApiOkResponse({ type: ArticlesResponseBody })
  @AuthIsOptional()
  @Get()
  async getManyArticles(
    @Req() req,
    @InjectAccount() account: Account,
    @Query(validateModel()) filters: ArticleFiltersDTO,
    @Query(validateModel()) pagination: PaginationDTO,
  ): Promise<ArticlesResponseBody> {
    const me = await this.authorsService.getByAccount(account).catch(() => null)
    const articles = await this.articlesService
      .getView(me)
      .getArticlesByFilters(filters, pagination)

    const response: ArticlesResponseBody = {
      articles: articles.map((article) => {
        return cloneArticleToOutput(
          req,
          article,
          undefined,
          createLinksForArticle(req, article),
        )
      }),
    }
    if (articles.length > 0) {
      response.links = {
        next: buildUrl(
          req,
          'articles',
          filters.toParams(),
          pagination.getNextPage().toParams(),
        ),
      }
    }
    return response
  }

  @ApiOkResponse({ type: ArticleResponseBody })
  @Slug()
  @AuthIsOptional()
  @Get(':slug')
  async getArticle(
    @Req() req,
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseBody> {
    const me = await this.authorsService.getByAccount(account).catch(() => null)
    const article = await this.articlesService.getView(me).getArticle(slug)
    return {
      article: cloneArticleToOutput(
        req,
        article,
        undefined,
        createLinksForArticle(req, article),
      ),
    }
  }

  @ApiCreatedResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.CREATED)
  @Slug()
  @Post(':slug/favorite')
  favoriteArticle(
    @Req() req,
    @Param() slug: string,
  ): Promise<ArticleResponseBody> {
    return undefined
  }

  @ApiNoContentResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Slug()
  @Delete(':slug/favorite')
  unfavoriteArticle(
    @Req() req,
    @Param() slug: string,
  ): Promise<ArticleResponseBody> {
    return undefined
  }

  @ApiCreatedResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createArticle(
    @Req() req,
    @InjectAccount() account: Account,
    @Body(validateModel())
    body: CreateArticleBody,
  ): Promise<ArticleResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService
      .getCMS(me)
      .createArticle(body.article)
    return {
      article: cloneArticleToOutput(
        req,
        article,
        undefined,
        createLinksForArticle(req, article),
      ),
    }
  }

  @ApiOkResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.OK)
  @Slug()
  @Put(':slug')
  async updateArticle(
    @Req() req,
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
    @Body(validateModel())
    body: UpdateArticleBody,
  ): Promise<ArticleResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService
      .getCMS(me)
      .updateArticle(slug, body.article)
    return {
      article: cloneArticleToOutput(
        req,
        article,
        undefined,
        createLinksForArticle(req, article),
      ),
    }
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Slug()
  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ) {
    const me = await this.authorsService.getByAccount(account)
    await this.articlesService.getCMS(me).deleteArticle(slug)
  }

  @ApiCreatedResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.CREATED)
  @Slug()
  @Post(':slug/publication')
  async publishArticle(
    @Req() req,
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService.getCMS(me).publishArticle(slug)
    return {
      article: cloneArticleToOutput(
        req,
        article,
        undefined,
        createLinksForArticle(req, article),
      ),
    }
  }

  @ApiNoContentResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Slug()
  @Delete(':slug/publication')
  async unpublishArticle(
    @Req() req,
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService.getCMS(me).unpublishArticle(slug)
    return {
      article: cloneArticleToOutput(
        req,
        article,
        undefined,
        createLinksForArticle(req, article),
      ),
    }
  }
}
