import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ProfilesService } from '../../profiles/profiles.service'
import { JWTAuthGuard } from '../../utils/jwt.guard'
import { AccountType } from '../../utils/jwt.strategy'
import { validateModel } from '../../utils/validation.utils'
import {
  ArticleResponseDTO,
  CreateArticleDTO,
  UpdateArticleDTO,
} from '../articles.dto'
import { ArticlesService } from '../articles.service'

@ApiTags('articles')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('articles')
export class ArticlesLifecycleController {
  constructor(
    private articles: ArticlesService,
    private profiles: ProfilesService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArticle(
    @Req() req: { user: AccountType },
    @Body('article', validateModel())
    article: CreateArticleDTO,
  ): Promise<{ article: ArticleResponseDTO }> {
    const author = await this.profiles.getProfileOrFail({ account: req.user })
    const cms = this.articles.getCMS(author)
    const entity = await cms.createFromSnapshot(article)
    return {
      article: {
        ...entity.createSnapshot(),
        author: author.createSnapshot(),
        favoritesCount: 0,
      },
    }
  }

  @Put(':slug')
  @HttpCode(HttpStatus.OK)
  async updateArticle(
    @Req() req: { user: AccountType },
    @Param('slug') slug: string,
    @Body('article', validateModel())
    article: UpdateArticleDTO,
  ): Promise<{ article: ArticleResponseDTO }> {
    const author = await this.profiles.getProfileOrFail({ account: req.user })
    const cms = this.articles.getCMS(author)
    const entity = await cms.getArticle(slug)
    await entity.loadSnapshot(article)
    await entity.save()
    return {
      article: {
        ...entity.createSnapshot(),
        author: author.createSnapshot(),
        favoritesCount: 0,
      },
    }
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArticle(
    @Req() req: { user: AccountType },
    @Param('slug') slug: string,
  ) {
    const author = await this.profiles.getProfileOrFail({ account: req.user })
    const cms = this.articles.getCMS(author)
    const article = await cms.getArticle(slug)
    await article.delete()
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':slug/publication')
  async publishArticle(
    @Req() req: { user: AccountType },
    @Param('slug') slug: string,
  ) {
    const author = await this.profiles.getProfileOrFail({ account: req.user })
    const cms = this.articles.getCMS(author)
    const entity = await cms.getArticle(slug)
    await entity.publish()
    await entity.save()
    return {
      article: {
        ...entity.createSnapshot(),
        author: author.createSnapshot(),
        favoritesCount: 0,
      },
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':slug/publication')
  async unpublishArticle(
    @Req() req: { user: AccountType },
    @Param('slug') slug: string,
  ) {
    const author = await this.profiles.getProfileOrFail({ account: req.user })
    const cms = this.articles.getCMS(author)
    const entity = await cms.getArticle(slug)
    await entity.unpublish()
    await entity.save()
    return {
      article: {
        ...entity.createSnapshot(),
        author: author.createSnapshot(),
        favoritesCount: 0,
      },
    }
  }
}
