package com.hexagonkt.realworld.routes

import com.fasterxml.jackson.annotation.JsonInclude

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.helpers.withZone
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.injector
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.convertToMap
import com.hexagonkt.store.Store
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

import kotlin.text.Charsets.UTF_8

data class ArticleRequest(
    val title: String,
    val description: String,
    val body: String,
    val tagList: Set<String>
)

data class ArticleRequestRoot(val article: ArticleRequest)

data class AuthorResponse(
    val username: String,
    val bio: String,
    val image: String,
    val following: Boolean
)

data class ArticleCreationResponse(
    val slug: String,
    val title: String,
    val description: String,
    val body: String,
    val tagList: Set<String>,
    val createdAt: String,
    val updatedAt: String,
    val favorited: Boolean,
    val favoritesCount: Int,
    val author: String
)

data class ArticleCreationResponseRoot(val article: ArticleCreationResponse) {
    constructor(article: Article, subject: String) : this(
        ArticleCreationResponse(
            slug = article.slug,
            title = article.title,
            description = article.description,
            body = article.body,
            tagList = article.tagList,
            createdAt = article.createdAt.toIso8601(),
            updatedAt = article.updatedAt.toIso8601(),
            favorited = false,
            favoritesCount = 0,
            author = subject
        )
    )
}

data class PutArticleRequest(
    val title: String?,
    val description: String?,
    val body: String?,
    val tagList: Set<String> = emptySet()
)

data class PutArticleRequestRoot(val article: PutArticleRequest)

data class ArticleResponse(
    val slug: String,
    val title: String,
    val description: String,
    val body: String,
    val tagList: Set<String>,
    val createdAt: String,
    val updatedAt: String,
    val favorited: Boolean,
    val favoritesCount: Int,
    val author: AuthorResponse
)

data class ArticleResponseRoot(val article: ArticleResponse) {
    constructor(article: Article, author: User, subject: String) : this(
        ArticleResponse(
            slug = article.slug,
            title = article.title,
            description = article.description,
            body = article.body,
            tagList = article.tagList,
            createdAt = article.createdAt.toIso8601(),
            updatedAt = article.updatedAt.toIso8601(),
            favorited = article.favoritedBy.contains(subject),
            favoritesCount = article.favoritedBy.size,
            author = AuthorResponse(
                username = author.username,
                bio = author.bio ?: "",
                image = author.image?.toString() ?: "",
                following = author.following.contains(subject)
            )
        )
    )
}

@JsonInclude(JsonInclude.Include.NON_NULL)
data class ArticlesResponseRoot(
    val articles: List<ArticleResponse>,
    val articlesCount: Long
)

internal val articlesRouter = Router {
    val jwt: Jwt = injector.inject()
    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)
    val articles: Store<Article, String> = injector.inject<Store<Article, String>>(Article::class)

    authenticate(jwt)
    get("/feed") { getFeed(users, articles) }

    path("/{slug}") {
        path("/favorite") {
            post { favoriteArticle(users, articles, true) }
            delete { favoriteArticle(users, articles, false) }
        }

        path("/comments", commentsRouter)

        delete { deleteArticle(articles) }
        put { updateArticle(articles) }
        get { getArticle(users, articles) }
    }

    post { createArticle(articles) }
    get { findArticles(users, articles) }
}

private fun Call.findArticles(users: Store<User, String>, articles: Store<Article, String>) {
    val principal = attributes["principal"] as DecodedJWT

    // Get user

    // Get query params

    // tag
    // author

    // favorited
    // limit
    // offset

    val all = articles.findAll()
    val authors = users.findMany(mapOf(User::username.name to (all.map { it.author } + principal.subject)))
    val authorsMap = authors.map { it.username to it }.toMap()
    val user = authorsMap[principal.subject]
    val responses = all.map {
        ArticleResponse(
            slug = it.slug,
            title = it.title,
            description = it.description,
            body = it.body,
            tagList = it.tagList,
            createdAt = it.createdAt.toIso8601(),
            updatedAt = it.updatedAt.toIso8601(),
            favorited = it.favoritedBy.contains(principal.subject),
            favoritesCount = it.favoritedBy.size,
            author = AuthorResponse(
                username = it.author,
                bio = "",
                image = "",
                following = false
            )
        )
    }

    ok(ArticlesResponseRoot(responses, articles.count()), charset = UTF_8)
}

private fun Call.createArticle(articles: Store<Article, String>) {
    val principal = attributes["principal"] as DecodedJWT
    val bodyArticle = request.body<ArticleRequestRoot>().article
    val article = Article(
        slug = bodyArticle.title.toSlug(),
        author = principal.subject,
        title = bodyArticle.title,
        description = bodyArticle.description,
        body = bodyArticle.body,
        tagList = bodyArticle.tagList
    )

    articles.insertOne(article)
    val content = ArticleCreationResponseRoot(article, principal.subject)
    ok(content, charset = UTF_8)
}

private fun Call.favoriteArticle(
    users: Store<User, String>, articles: Store<Article, String>, favorite: Boolean) {

    val principal = attributes["principal"] as DecodedJWT
    val slug = pathParameters["slug"]
    val article = articles.findOne(slug) ?: halt(404)
    val author = users.findOne(article.author) ?: halt(500)
    // TODO Updates fail if not formatted as string
    val updatedAt = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
    val pair = Article::updatedAt.name to updatedAt
    val favoritedBy =
        if (favorite) article.favoritedBy + principal.subject
        else article.favoritedBy - principal.subject
    val updates = mapOf(Article::favoritedBy.name to favoritedBy)

    if (!articles.updateOne(slug, updates + pair))
        halt(500)

    val favoritedArticle = article.copy(favoritedBy = favoritedBy)
    val content = ArticleResponseRoot(favoritedArticle, author, principal.subject)
    ok(content, charset = UTF_8)
}

private fun Call.getArticle(users: Store<User, String>, articles: Store<Article, String>) {
    val principal = attributes["principal"] as DecodedJWT
    val slug = pathParameters["slug"]
    val article = articles.findOne(slug) ?: halt(404)
    val author = users.findOne(article.author) ?: halt(500)
    ok(ArticleResponseRoot(article, author, principal.subject), charset = UTF_8)
}

private fun Call.updateArticle(articles: Store<Article, String>) {
    val principal = attributes["principal"] as DecodedJWT
    val body = request.body<PutArticleRequestRoot>().article
    val slug = pathParameters["slug"]
    val updatedAt = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) // TODO Fails if not formatted as string
    val requestUpdates = body.convertToMap().mapKeys { it.key.toString() } + (Article::updatedAt.name to updatedAt)

    val updates =
        if (body.title != null) requestUpdates + (Article::slug.name to body.title.toSlug())
        else requestUpdates

    val updated = articles.updateOne(slug, updates)

    if (updated) {
        val article = articles.findOne(slug) ?: halt(500)
        val content = ArticleCreationResponseRoot(article, principal.subject)
        ok(content, charset = UTF_8)
    } else {
        send(500, "Article $slug not updated")
    }
}

private fun Call.deleteArticle(articles: Store<Article, String>) {
    if (!articles.deleteOne(pathParameters["slug"]))
        halt(404)
}

private fun Call.getFeed(users: Store<User, String>, articles: Store<Article, String>) {
    val principal = attributes["principal"] as DecodedJWT
    val user = users.findOne(principal.subject) ?: halt(404)
    val filter = mapOf(Article::author.name to (user.following.toList()))

    if(user.following.isEmpty()) {
        ok(ArticlesResponseRoot(emptyList(), 0), charset = UTF_8)
    }
    else {
        val responses = articles.findMany(filter).map {
            ArticleResponse(
                slug = it.slug,
                title = it.title,
                description = it.description,
                body = it.body,
                tagList = it.tagList,
                createdAt = it.createdAt.toIso8601(),
                updatedAt = it.updatedAt.toIso8601(),
                favorited = it.favoritedBy.contains(principal.subject),
                favoritesCount = it.favoritedBy.size,
                author = AuthorResponse(
                    username = it.author,
                    bio = "",
                    image = "",
                    following = false
                )
            )
        }

        ok(ArticlesResponseRoot(responses, articles.count(filter)), charset = UTF_8)
    }
}

private fun String.toSlug() =
    this.toLowerCase().replace(' ', '-')

private fun LocalDateTime.toIso8601() =
    this.withZone().withZoneSameInstant(ZoneOffset.UTC).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "Z"
