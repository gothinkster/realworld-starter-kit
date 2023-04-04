import { LoremIpsum } from 'lorem-ipsum'
import { Article, Tagged } from '../articles/articles.models'
import { slugify } from '../articles/slugify'

const lorem = new LoremIpsum()

export function makeRandomArticle(article: Partial<Article & Tagged> = {}) {
  const title = article?.title || lorem.generateSentences(1)
  return {
    title: title,
    slug: slugify(title),
    description: article?.description || lorem.generateSentences(2),
    body: article?.body || lorem.generateParagraphs(1),
    tags: [
      ...new Set(
        article?.tags || lorem.generateWords(4).toLowerCase().split(' '),
      ),
    ],
  }
}
