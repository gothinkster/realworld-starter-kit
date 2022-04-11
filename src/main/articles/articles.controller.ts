import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { ArticlesService } from './articles.service'
import {
  ArticleRequestPayload,
  ArticleResponsePayload,
  ArticleUpdateDTO,
} from './articles.dto'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true }))
    articlePayload: ArticleRequestPayload,
  ): ArticleResponsePayload {
    const response = new ArticleResponsePayload()
    response.article = this.articlesService.create(articlePayload.article)
    return response
  }

  @Get()
  findAll(@Query() query) {
    return this.articlesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: ArticleUpdateDTO) {
    return this.articlesService.update(+id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id)
  }
}
