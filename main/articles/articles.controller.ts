import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { createAuthorDTO } from '../authors/authors.controller'
import { AuthorsService, Profile } from '../authors/authors.service'
import { AuthIsOptional, JWTAuthGuard } from '../nest/jwt.guard'
import { Pagination, ZodPagination } from '../nest/pagination'
import { buildUrlToPath } from '../nest/url'
import { createZodTransformer } from '../nest/validation.utils'
import { Article, Dated, Sluged, Tagged } from './articles.models'
import { ArticlesService } from './articles.service'

const title = z
  .string()
  .describe('The article title. Example: "How to train your dragon"')

const description = z
  .string()
  .describe(
    'The article description. Example: "Tips and tricks to train your dragon"',
  )

const body = z
  .string()
  .describe(
    'The article body. Example: "Give it a lot a training and feed it with fish."',
  )

const tags = z
  .array(z.string())
  .describe('The article tags. Example: ["dragons", "training"]')

export const CreateArticleBody = z.object({
  article: z.object({
    title,
    description,
    body,
    tags,
  }),
})

type CreateArticleBody = z.infer<typeof CreateArticleBody>

export const UpdateArticleBody = z.object({
  article: z.object({
    title: title.optional(),
    description: description.optional(),
    body: body.optional(),
    tags: tags.optional(),
  }),
})

type UpdateArticleBody = z.infer<typeof UpdateArticleBody>

export const ArticleFiltersDTO = z
  .object({
    tags: z
      .string()
      .describe(
        'Comma separated tags to query articles. Example: dragons,training',
      )
      .optional()
      .transform((tags) => tags?.split(',')),
    author: z.string().optional().describe('The article author username'),
    favorited: z.coerce
      .boolean()
      .optional()
      .describe('Whether the article is favorited by you'),
  })
  .transform((o) => {
    return {
      ...o,
      toParams: () => ({
        ...(o.tags ? { tags: o.tags.join(',') } : {}),
        ...(o.author ? { author: o.author } : {}),
        ...(o.favorited ? { favorited: o.favorited.toString() } : {}),
      }),
    }
  })

type ArticleFiltersDTO = z.infer<typeof ArticleFiltersDTO>

@ApiTags('articles')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(
    private articlesService: ArticlesService,
    private authorsService: AuthorsService,
  ) {}

  @AuthIsOptional()
  @Get('feed')
  async getFeed(
    @Req() req,
    @Query(createZodTransformer(ZodPagination)) pagination: Pagination,
  ) {
    const view = this.articlesService.getView(
      req.user
        ? await this.authorsService.getUserAuthorProfile(req.user)
        : undefined,
    )
    const articles = await view.getFeed(pagination)
    return {
      articles: articles.map((article) =>
        createArticleDTO(req, article, article.author, undefined),
      ),
      links:
        articles.length > 0
          ? {
              next: buildUrlToPath(
                req,
                'articles/feed',
                pagination.getNextPage().toParams(),
              ),
            }
          : {},
    }
  }

  @AuthIsOptional()
  @Get()
  async getManyArticles(
    @Req() req,
    @Query(createZodTransformer(ArticleFiltersDTO))
    filters: ArticleFiltersDTO,
    @Query(createZodTransformer(ZodPagination)) pagination: Pagination,
  ) {
    const view = this.articlesService.getView(
      req.user
        ? await this.authorsService.getUserAuthorProfile(req.user)
        : undefined,
    )
    const articles = await view.getArticlesByFilters(filters, pagination)
    return {
      articles: articles.map((article) =>
        createArticleDTO(req, article, article.author, undefined),
      ),
      links:
        articles.length > 0
          ? {
              next: buildUrlToPath(
                req,
                'articles',
                filters.toParams(),
                pagination.getNextPage().toParams(),
              ),
            }
          : {},
    }
  }

  @AuthIsOptional()
  @Get(':slug')
  async getArticle(@Req() req, @Param('slug') slug: string) {
    const view = this.articlesService.getView(
      req.user
        ? await this.authorsService.getUserAuthorProfile(req.user)
        : undefined,
    )
    const article = await view.getArticle(slug)
    return {
      article: createArticleDTO(req, article, article.author),
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':slug/favorite')
  favoriteArticle(@Req() req, @Param() slug: string) {
    return undefined
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':slug/favorite')
  unfavoriteArticle(@Req() req, @Param() slug: string) {
    return undefined
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createArticle(
    @Req() req,
    @Body(createZodTransformer(CreateArticleBody))
    body: CreateArticleBody,
  ) {
    const me = await this.authorsService.getUserAuthorProfile(req.user)
    const cms = this.articlesService.getCMS(me)
    const article = await cms.createArticle(body.article)
    return {
      article: createArticleDTO(req, article, me),
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':slug')
  async updateArticle(
    @Req() req,
    @Param('slug') slug: string,
    @Body(createZodTransformer(UpdateArticleBody))
    body: UpdateArticleBody,
  ) {
    const me = await this.authorsService.getUserAuthorProfile(req.user)
    const cms = this.articlesService.getCMS(me)
    const article = await cms.updateArticle(slug, body.article)
    return {
      article: createArticleDTO(req, article, me),
    }
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArticle(@Req() req, @Param('slug') slug: string) {
    const me = await this.authorsService.getUserAuthorProfile(req.user)
    const cms = this.articlesService.getCMS(me)
    await cms.deleteArticle(slug)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':slug/publication')
  async publishArticle(@Req() req, @Param('slug') slug: string) {
    const me = await this.authorsService.getUserAuthorProfile(req.user)
    const cms = this.articlesService.getCMS(me)
    const article = await cms.publishArticle(slug)
    return {
      article: createArticleDTO(req, article, me),
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':slug/publication')
  async unpublishArticle(@Req() req, @Param('slug') slug: string) {
    const me = await this.authorsService.getUserAuthorProfile(req.user)
    const cms = this.articlesService.getCMS(me)
    const article = await cms.unpublishArticle(slug)
    return {
      article: createArticleDTO(req, article, me),
    }
  }
}

function createArticleDTO(
  req,
  article: Article & Dated & Sluged & Tagged,
  author: Profile,
  favorited?: boolean,
) {
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    body: article.body,
    ...(favorited !== undefined ? { favorited } : {}),
    tags: article.tags,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    author: createAuthorDTO(req, author),
    links: {
      self: buildUrlToPath(req, `articles/${article.slug}`),
      author: buildUrlToPath(req, `profiles/${author.username}`),
      comments: buildUrlToPath(req, `articles/${article.slug}/comments`),
    },
  } as const
}
