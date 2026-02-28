package com.example.article

import com.example.api.ArticlesApi
import com.example.api.model.CreateArticle201Response
import com.example.api.model.CreateArticleRequest
import com.example.api.model.GetArticlesFeed200Response
import com.example.api.model.UpdateArticleRequest
import com.example.shared.security.SecurityContext
import jakarta.annotation.security.RolesAllowed
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.ws.rs.Path
import jakarta.ws.rs.core.Response

@Path("/api")
@ApplicationScoped
class ArticleResource : ArticlesApi {
    @Inject
    lateinit var articleService: ArticleService

    @Inject
    lateinit var articleQueries: ArticleQueries

    @Inject
    lateinit var securityContext: SecurityContext

    @RolesAllowed("user")
    override fun createArticle(article: CreateArticleRequest): Response {
        val newArticle = article.article

        val created =
            articleService.createArticle(
                title = newArticle.title,
                description = newArticle.description,
                body = newArticle.body,
                tags = newArticle.tagList ?: emptyList(),
            )

        val viewerId = securityContext.currentUserId
        val articleDto = articleQueries.getArticleBySlug(created.slug, viewerId)

        return Response
            .status(Response.Status.CREATED)
            .entity(CreateArticle201Response().article(articleDto))
            .build()
    }

    @RolesAllowed("user")
    override fun deleteArticle(slug: String): Response {
        articleService.deleteArticle(slug)

        return Response.noContent().build()
    }

    override fun getArticle(slug: String): Response {
        val viewerId = securityContext.currentUserId
        val articleDto = articleQueries.getArticleBySlug(slug, viewerId)

        return Response
            .ok(CreateArticle201Response().article(articleDto))
            .build()
    }

    @Suppress("UNCHECKED_CAST")
    override fun getArticles(
        tag: String?,
        author: String?,
        favorited: String?,
        offset: Int?,
        limit: Int?,
    ): Response {
        val viewerId = securityContext.currentUserId
        val articles =
            articleQueries.getArticles(
                tag = tag,
                author = author,
                favorited = favorited,
                limit = limit ?: 20,
                offset = offset ?: 0,
                viewerId = viewerId,
            )

        return Response
            .ok(
                GetArticlesFeed200Response()
                    .articles(articles as List<com.example.api.model.GetArticlesFeed200ResponseArticlesInner>)
                    .articlesCount(articleQueries.countArticles(tag, author, favorited)),
            ).build()
    }

    @Suppress("UNCHECKED_CAST")
    @RolesAllowed("user")
    override fun getArticlesFeed(
        offset: Int?,
        limit: Int?,
    ): Response {
        val viewerId = securityContext.currentUserId!!
        val articles =
            articleQueries.getArticlesFeed(
                limit = limit ?: 20,
                offset = offset ?: 0,
                viewerId = viewerId,
            )

        return Response
            .ok(
                GetArticlesFeed200Response()
                    .articles(articles as List<com.example.api.model.GetArticlesFeed200ResponseArticlesInner>)
                    .articlesCount(articleQueries.countArticlesFeed(viewerId)),
            ).build()
    }

    @RolesAllowed("user")
    override fun updateArticle(
        slug: String,
        article: UpdateArticleRequest,
    ): Response {
        val updateData = article.article

        val updated =
            articleService.updateArticle(
                slug = slug,
                title = updateData.title,
                description = updateData.description,
                body = updateData.body,
            )

        val viewerId = securityContext.currentUserId
        val articleDto = articleQueries.getArticleBySlug(updated.slug, viewerId)

        return Response
            .ok(CreateArticle201Response().article(articleDto))
            .build()
    }
}
