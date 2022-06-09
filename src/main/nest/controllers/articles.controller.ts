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
import { ContentManagementSystem } from '../../domain/articles/cms.service'
import { ArticleView } from '../../domain/articles/views.service'
import { Account, Profile } from '../../domain/profiles/models'
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
export class ArticlesController {
  constructor(
    private articles: ArticlesService,
    private profiles: ProfilesService,
  ) {}

  @Get('feed')
  async getFeed(
    @InjectAccount() account: Account,
    @QueryInt('limit', 20) limit?: number,
    @QueryInt('offset', 0) offset?: number,
  ): Promise<{ articles: ArticleResponseDTO[] }> {
    const { view } = await this.getKit(account)
    const articles = await view.getFeed(limit, offset)
    return {
      articles: articles.map((article) => {
        return cloneArticleToOutput(article)
      }),
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
    const { view } = await this.getKit(account, false)
    const articles = await view.getArticlesByFilters(filters, limit, offset)
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
    const { view } = await this.getKit(account, false)
    const article = await view.getArticle(slug)
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
    articleDTO: CreateArticleDTO,
  ): Promise<{ article: ArticleResponseDTO }> {
    const { me, cms } = await this.getKit(account)
    const article = await cms.createArticle(articleDTO)
    return {
      article: cloneArticleToOutput(
        article,
        cloneProfileToOutput(me, account.email),
      ),
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
    const { me, cms } = await this.getKit(account)
    const article = await cms.updateArticle(slug, articleDTO)
    return {
      article: cloneArticleToOutput(
        article,
        cloneProfileToOutput(me, account.email),
      ),
    }
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ) {
    const { cms } = await this.getKit(account)
    await cms.deleteArticle(slug)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':slug/publication')
  async publishArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    const { me, cms } = await this.getKit(account)
    const article = await cms.publish(slug)
    return {
      article: cloneArticleToOutput(
        article,
        cloneProfileToOutput(me, account.email),
      ),
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':slug/publication')
  async unpublishArticle(
    @InjectAccount() account: Account,
    @Param('slug') slug: string,
  ): Promise<{ article: ArticleResponseDTO }> {
    const { me, cms } = await this.getKit(account)
    const article = await cms.unpublish(slug)
    return {
      article: cloneArticleToOutput(
        article,
        cloneProfileToOutput(me, account.email),
      ),
    }
  }

  private async getKit(
    account: Account,
    userRequired: boolean = true,
  ): Promise<{
    me: Profile
    cms: ContentManagementSystem
    view: ArticleView
  }> {
    const promise = this.profiles.getByAccount(account)
    let me: Profile
    let cms: ContentManagementSystem
    if (userRequired) {
      me = await promise
      cms = this.articles.getCMS(me)
    } else {
      me = await promise.catch(() => null)
    }
    const view = this.articles.getViews(me)
    return {
      me,
      cms,
      view,
    }
  }
}
