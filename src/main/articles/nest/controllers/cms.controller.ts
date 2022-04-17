import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common'
import {
  ArticleCreateDTO,
  ArticleRequestPayload,
  ArticleResponsePayload,
  ArticleUpdateDTO,
} from '../dtos/articles.dto'
import { validateModel } from '../../../utils/validation.utils'
import { ArticlesService } from '../../articles.service'
import { ProfilesService } from '../../../profiles/profiles.service'

@Controller('articles')
export class ArticlesLifecycleController {
  constructor(
    private articles: ArticlesService,
    private profiles: ProfilesService,
  ) {}
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
}
