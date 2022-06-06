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
import { Account } from '../../domain/profiles/models'
import { ProfilesService } from '../../domain/profiles/service'
import { InjectAccount } from '../decorators/account.decorator'
import {
  ArticleFiltersDTO,
  ArticleResponseDTO,
  cloneArticleToOutput,
  CreateArticleDTO,
  UpdateArticleDTO,
} from '../parsing/articles.dto'
import { cloneProfileToOutput } from '../parsing/profiles.dto'
import { AuthIsOptional, JWTAuthGuard } from '../security/jwt.guard'
import { QueryInt, validateModel } from '../validation/validation.utils'

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
    @InjectAccount() account: Account,
    @Query(validateModel()) filters: ArticleFiltersDTO,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): Promise<{ articles: ArticleResponseDTO[] }> {
    const user = await this.profiles.getByAccount(account).catch(() => null)
    const view = await this.articles.getViews(user)
    const articles = await view.getArticlesByFilters(filters, limit, offset)
    return {
      articles: articles.map((article) => {
        return cloneArticleToOutput(article)
      }),
    }
  }

  @Get('feed')
  async getFeed(
    @InjectAccount() account: Account,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): Promise<{ articles: ArticleResponseDTO[] }> {
    const userProfile = await this.profiles.getByAccount(account)
    const view = await this.articles.getViews(userProfile)
    const articles = await view.getFeed(limit, offset)
    return {
      articles: articles.map((article) => {
        return cloneArticleToOutput(article)
      }),
    }
  }

  @AuthIsOptional()
  @Get(':slug')
  async getArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    const user = await this.profiles.getByAccount(account).catch(() => null)
    const article = await this.articles.getViews(user).getArticle(slug)
    return {
      article: cloneArticleToOutput(
        article,
        cloneProfileToOutput(await this.profiles.getByAuthor(article.author)),
      ),
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
    article: CreateArticleDTO,
  ): Promise<{ article: ArticleResponseDTO }> {
    const author = await this.profiles.getByAccount(account)
    const cms = this.articles.getCMS(author)
    const entity = await cms.createArticle(article)
    return {
      article: cloneArticleToOutput(
        entity,
        cloneProfileToOutput(author, account.email),
      ),
    }
  }

  @Put(':slug')
  @HttpCode(HttpStatus.OK)
  async updateArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
    @Body('article', validateModel())
    article: UpdateArticleDTO,
  ): Promise<{ article: ArticleResponseDTO }> {
    const author = await this.profiles.getByAccount(account)
    const cms = this.articles.getCMS(author)
    const entity = await cms.updateArticle(slug, article)
    return {
      article: cloneArticleToOutput(
        entity,
        cloneProfileToOutput(author, account.email),
      ),
    }
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ) {
    const userProfile = await this.profiles.getByAccount(account)
    const cms = this.articles.getCMS(userProfile)
    await cms.deleteArticle(slug)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':slug/publication')
  async publishArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    const author = await this.profiles.getByAccount(account)
    const cms = this.articles.getCMS(author)
    const entity = await cms.publish(slug)
    return {
      article: cloneArticleToOutput(
        entity,
        cloneProfileToOutput(author, account.email),
      ),
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':slug/publication')
  async unpublishArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    const author = await this.profiles.getByAccount(account)
    const cms = this.articles.getCMS(author)
    const entity = await cms.unpublish(slug)
    return {
      article: cloneArticleToOutput(
        entity,
        cloneProfileToOutput(author, account.email),
      ),
    }
  }
}
