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
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ArticlesService } from '../../domain/articles/articles.service'
import { Account } from '../../domain/authors/models'
import { AuthorsService } from '../../domain/authors/service'
import { InjectAccount } from '../decorators/account.decorator'
import {
  ArticleFiltersDTO,
  ArticleResponseBody,
  ArticlesResponseBody,
  cloneArticleToOutput,
  CreateArticleBody,
  Slug,
  UpdateArticleBody,
} from '../parsing/articles.dto'
import { PaginationDTO } from '../parsing/pagination.dto'
import { AuthIsOptional, JWTAuthGuard } from '../security/jwt.guard'
import { validateModel } from '../validation/validation.utils'

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
    @InjectAccount() account: Account,
    @Query(validateModel()) pagination: PaginationDTO,
  ): Promise<ArticlesResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const articles = await this.articlesService.getView(me).getFeed(pagination)
    return {
      articles: articles.map((article) => cloneArticleToOutput(article)),
    }
  }

  @ApiOkResponse({ type: ArticlesResponseBody })
  @AuthIsOptional()
  @Get()
  async getManyArticles(
    @InjectAccount() account: Account,
    @Query(validateModel()) filters: ArticleFiltersDTO,
    @Query(validateModel()) pagination: PaginationDTO,
  ): Promise<ArticlesResponseBody> {
    const me = await this.authorsService.getByAccount(account).catch(() => null)
    const articles = await this.articlesService
      .getView(me)
      .getArticlesByFilters(filters, pagination)
    return {
      articles: articles.map((article) => cloneArticleToOutput(article)),
    }
  }

  @ApiOkResponse({ type: ArticleResponseBody })
  @Slug()
  @AuthIsOptional()
  @Get(':slug')
  async getArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseBody> {
    const me = await this.authorsService.getByAccount(account).catch(() => null)
    const article = await this.articlesService.getView(me).getArticle(slug)
    return {
      article: cloneArticleToOutput(article),
    }
  }

  @ApiCreatedResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.CREATED)
  @Slug()
  @Post(':slug/favorite')
  favoriteArticle(@Param() slug: string): Promise<ArticleResponseBody> {
    return undefined
  }

  @ApiNoContentResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Slug()
  @Delete(':slug/favorite')
  unfavoriteArticle(@Param() slug: string): Promise<ArticleResponseBody> {
    return undefined
  }

  @ApiCreatedResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createArticle(
    @InjectAccount() account: Account,
    @Body(validateModel())
    body: CreateArticleBody,
  ): Promise<ArticleResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService
      .getCMS(me)
      .createArticle(body.article)
    return {
      article: cloneArticleToOutput(article),
    }
  }

  @ApiOkResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.OK)
  @Slug()
  @Put(':slug')
  async updateArticle(
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
      article: cloneArticleToOutput(article),
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
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService.getCMS(me).publishArticle(slug)
    return {
      article: cloneArticleToOutput(article),
    }
  }

  @ApiNoContentResponse({ type: ArticleResponseBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Slug()
  @Delete(':slug/publication')
  async unpublishArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseBody> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService.getCMS(me).unpublishArticle(slug)
    return {
      article: cloneArticleToOutput(article),
    }
  }
}
