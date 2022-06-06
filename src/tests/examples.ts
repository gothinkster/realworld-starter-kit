import { Article, Sluged } from '../main/domain/articles/models'

export const exampleTags = ['dragons', 'friendship']

export const exampleArticle: Sluged<Article> = {
  title: 'How to train your dragon?',
  description: "You should train your dragon before it's too late",
  body: 'Feed it with fish',
  tags: exampleTags,
  slug: 'how-to-train-your-dragon',
}

export const exampleArticle2 = {
  body: 'Play with it',
}
