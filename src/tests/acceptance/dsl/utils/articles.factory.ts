import { LoremIpsum } from 'lorem-ipsum'
import { Article, ArticleFields } from '../../../../main/domain/articles/models'

const lorem = new LoremIpsum()

export function makeRandomArticle(
  article: ArticleFields = {},
): Readonly<Article> {
  return {
    title: article?.title || lorem.generateSentences(1),
    description: article?.description || lorem.generateSentences(2),
    body: article?.body || lorem.generateParagraphs(1),
    tags: [
      ...new Set(
        article?.tags || lorem.generateWords(4).toLowerCase().split(' '),
      ),
    ].sort(),
  }
}
