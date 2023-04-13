import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server'
import { ArticleNotFound } from '../articles/articles.service'
import { AuthorNotFound } from '../authors/authors.service'
import { CommentNotFoundException } from '../comments/comments.repository'
import { getUserFromHeaders } from '../nest/jwt.guard'

export async function createContext({ req }) {
  return {
    user: getUserFromHeaders(req.headers),
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

const notFoundErrors = [
  CommentNotFoundException,
  AuthorNotFound,
  ArticleNotFound,
]

export function createTRPCApp() {
  const t = initTRPC.context<Context>().create()
  const router = t.router

  const procedure = t.procedure.use(
    t.middleware(async ({ next, ctx }) => {
      const res = await next({ ctx })

      if (res.ok) return res

      for (const NotFoundError of notFoundErrors) {
        if (res.error.cause instanceof NotFoundError) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: res.error.cause.message,
            cause: res.error.cause,
          })
        }
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: res.error.cause,
      })
    }),
  )

  const publicProcedure = procedure

  const protectedProcedure = procedure.use(
    t.middleware(({ next, ctx }) => {
      if (ctx.user === null) {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }
      return next({
        ctx: {
          ...ctx,
          user: ctx.user,
        },
      })
    }),
  )

  return {
    t,
    router,
    publicProcedure,
    protectedProcedure,
  }
}

export type TRPC = Omit<ReturnType<typeof createTRPCApp>, 't'>
