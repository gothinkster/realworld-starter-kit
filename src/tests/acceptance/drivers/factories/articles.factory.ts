import { LoremIpsum } from 'lorem-ipsum'
import {
  ArticleSnapshot,
  PartialArticleSnapshot,
} from '../../../../main/articles/articles.models'

const lorem = new LoremIpsum()

export function makeRandomArticle(
  article: PartialArticleSnapshot = {},
): Readonly<ArticleSnapshot> {
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
