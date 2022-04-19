import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ProfilesService } from '../../../profiles/profiles.service'
import { JWTAuthGuard } from '../../../utils/jwt.guard'
import { validateModel } from '../../../utils/validation.utils'
import { ArticlesService } from '../../articles.service'
import {
  ArticleResponsePayload,
  CreateArticleDTO,
  UpdateArticleDTO,
} from '../dtos/articles.dto'

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
  createArticle(
    @Body('article', validateModel())
    article: CreateArticleDTO,
  ): ArticleResponsePayload {
    return undefined
  }

  @Put(':slug')
  updateArticle(
    @Param() slug: string,
    @Body('article', validateModel())
    article: UpdateArticleDTO,
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
}
