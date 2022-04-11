import { Injectable } from '@nestjs/common'
import {
  ArticleCreateDTO,
  ArticleResponseDTO,
  ArticleUpdateDTO,
} from './articles.dto'

@Injectable()
export class ArticlesService {
  create(newArticle: ArticleCreateDTO): ArticleResponseDTO {
    return new ArticleResponseDTO(newArticle)
  }

  findAll() {
    return `This action returns all articles`
  }

  findOne(id: number) {
    return `This action returns a #${id} article`
  }

  update(id: number, updateArticleDto: ArticleUpdateDTO) {
    return `This action updates a #${id} article`
  }

  remove(id: number) {
    return `This action removes a #${id} article`
  }
}
