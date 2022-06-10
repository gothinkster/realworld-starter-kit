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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ArticlesService } from '../../domain/articles/articles.service'
import { Account } from '../../domain/authors/models'
import { AuthorsService } from '../../domain/authors/service'
import { InjectAccount } from '../decorators/account.decorator'
import {
  ArticleFiltersDTO,
  ArticleResponseDTO,
  cloneArticleToOutput,
  CreateArticleDTO,
  UpdateArticleDTO,
} from '../parsing/articles.dto'
import { AuthIsOptional, JWTAuthGuard } from '../security/jwt.guard'
import { QueryInt, validateModel } from '../validation/validation.utils'

@ApiTags('articles')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(
    private articlesService: ArticlesService,
    private authorsService: AuthorsService,
  ) {}

  @Get('feed')
  async getFeed(
    @InjectAccount() account: Account,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): Promise<{ articles: ArticleResponseDTO[] }> {
    const me = await this.authorsService.getByAccount(account)
    const articles = await this.articlesService
      .getView(me)
      .getFeed(limit, offset)
    return {
      articles: articles.map((article) => cloneArticleToOutput(article)),
    }
  }

  @AuthIsOptional()
  @Get()
  async getManyArticles(
    @InjectAccount() account: Account,
    @Query(validateModel()) filters: ArticleFiltersDTO,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): Promise<{ articles: ArticleResponseDTO[] }> {
    const me = await this.authorsService.getByAccount(account).catch(() => null)
    const articles = await this.articlesService
      .getView(me)
      .getArticlesByFilters(filters, limit, offset)
    return {
      articles: articles.map((article) => cloneArticleToOutput(article)),
    }
  }

  @AuthIsOptional()
  @Get(':slug')
  async getArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    const me = await this.authorsService.getByAccount(account).catch(() => null)
    const article = await this.articlesService.getView(me).getArticle(slug)
    return {
      article: cloneArticleToOutput(article),
    }
  }

  @Post(':slug/favorite')
  favoriteArticle(
    @Param() slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    return undefined
  }

  @Delete(':slug/favorite')
  unfavoriteArticle(
    @Param() slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    return undefined
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArticle(
    @InjectAccount() account: Account,
    @Body('article', validateModel())
    articleDTO: CreateArticleDTO,
  ): Promise<{ article: ArticleResponseDTO }> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService
      .getCMS(me)
      .createArticle(articleDTO)
    return {
      article: cloneArticleToOutput(article),
    }
  }

  @Put(':slug')
  @HttpCode(HttpStatus.OK)
  async updateArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
    @Body('article', validateModel())
    articleDTO: UpdateArticleDTO,
  ): Promise<{ article: ArticleResponseDTO }> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService
      .getCMS(me)
      .updateArticle(slug, articleDTO)
    return {
      article: cloneArticleToOutput(article),
    }
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ) {
    const me = await this.authorsService.getByAccount(account)
    await this.articlesService.getCMS(me).deleteArticle(slug)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':slug/publication')
  async publishArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService.getCMS(me).publishArticle(slug)
    return {
      article: cloneArticleToOutput(article),
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':slug/publication')
  async unpublishArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    const me = await this.authorsService.getByAccount(account)
    const article = await this.articlesService.getCMS(me).unpublishArticle(slug)
    return {
      article: cloneArticleToOutput(article),
    }
  }
}
