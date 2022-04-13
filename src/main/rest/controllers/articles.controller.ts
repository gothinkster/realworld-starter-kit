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
import { validateModel } from '../functions.utils'

@Controller('articles')
export class ArticlesLifecycleController {
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
