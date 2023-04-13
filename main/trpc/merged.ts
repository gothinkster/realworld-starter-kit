import {
  ArticlesController,
  createArticlesTrpcRouter,
} from '../articles/articles.controller'
import {
  AuthorsController,
  createAuthorsTrpcRouter,
} from '../authors/authors.controller'
import {
  CommentsController,
  createCommentsTrpcRouter,
} from '../comments/comments.controller'
import { createTRPCApp } from './app'

export function createMergedTRPCApp(
  commentsController: CommentsController,
  articlesController: ArticlesController,
  authorsController: AuthorsController,
) {
  const trpc = createTRPCApp()
  return trpc.t.mergeRouters(
    createCommentsTrpcRouter(commentsController, trpc),
    createArticlesTrpcRouter(articlesController, trpc),
    createAuthorsTrpcRouter(authorsController, trpc),
  )
}

export type AppRouter = ReturnType<typeof createMergedTRPCApp>
