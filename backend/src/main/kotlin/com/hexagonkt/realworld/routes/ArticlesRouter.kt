package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.core.helpers.Jvm
import com.hexagonkt.core.helpers.fail
import com.hexagonkt.core.helpers.require
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.createArticleStore
import com.hexagonkt.realworld.createJwt
import com.hexagonkt.realworld.createUserStore
import com.hexagonkt.realworld.toIso8601
import com.hexagonkt.realworld.messages.*
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.toFieldsMap
import com.hexagonkt.store.Store
import java.time.LocalDateTime

import kotlin.text.Charsets.UTF_8

internal val articlesRouter by lazy {
    Router {
        val jwt: Jwt = createJwt()
        val users: Store<User, String> = createUserStore()
        val articles: Store<Article, String> = createArticleStore()

        get("/feed") { getFeed(jwt, users, articles) }

        path("/{slug}") {
            path("/favorite") {
                authenticate(jwt)
                post { favoriteArticle(users, articles, true) }
                delete { favoriteArticle(users, articles, false) }
            }

            path("/comments", commentsRouter)

            delete { deleteArticle(jwt, articles) }
            put { updateArticle(jwt, articles) }
            get { getArticle(jwt, users, articles) }
        }

        post { createArticle(jwt, articles) }
        get { findArticles(jwt, users, articles) }
    }
}

internal fun Call.findArticles(
    jwt: Jwt, users: Store<User, String>, articles: Store<Article, String>) {

    val principal = parsePrincipal(jwt)
    val subject = principal?.subject
    val filter = queryParameters.mapKeys {
        when (it.key) {
            "tag" -> Article::tagList.name
            "favorited" -> Article::favoritedBy.name
            else -> it.key
        }
    }

    ok(searchArticles(users, articles, subject, filter), charset = UTF_8)
}

private fun Call.createArticle(jwt: Jwt, articles: Store<Article, String>) {
    val principal = requirePrincipal(jwt)
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

    ok(ArticleCreationResponseRoot(article, principal.subject), charset = UTF_8)
}

internal fun Call.favoriteArticle(
    users: Store<User, String>, articles: Store<Article, String>, favorite: Boolean) {

    val principal = attributes["principal"] as DecodedJWT
    val slug = pathParameters.require("slug")
    val article = articles.findOne(slug) ?: halt(404)
    val author = checkNotNull(users.findOne(article.author))
    val user = checkNotNull(users.findOne(principal.subject)) // Both can be fetched with one 'find'
    val updatedAt = LocalDateTime.now()
    val pair = Article::updatedAt.name to updatedAt
    val favoritedBy =
        if (favorite) article.favoritedBy + principal.subject
        else article.favoritedBy - principal.subject
    val updates = mapOf(Article::favoritedBy.name to favoritedBy)

    if (!articles.updateOne(slug, updates + pair))
        halt(500)

    val favoritedArticle = article.copy(favoritedBy = favoritedBy)

    ok(ArticleResponseRoot(favoritedArticle, author, user), charset = UTF_8)
}

internal fun Call.getArticle(
    jwt: Jwt, users: Store<User, String>, articles: Store<Article, String>) {

    val principal = parsePrincipal(jwt)
    val article = articles.findOne(pathParameters.require("slug")) ?: halt(404)
    val author = checkNotNull(users.findOne(article.author))
    val user = users.findOne(principal?.subject ?: "")

    ok(ArticleResponseRoot(article, author, user), charset = UTF_8)
}

internal fun Call.updateArticle(jwt: Jwt, articles: Store<Article, String>) {
    val principal = requirePrincipal(jwt)
    val body = request.body<PutArticleRequestRoot>().article
    val slug = pathParameters.require("slug")

    val updatedAt = LocalDateTime.now()
    val updatedAtPair = Article::updatedAt.name to updatedAt
    val requestUpdates = body.toFieldsMap().mapKeys { it.key.toString() } + updatedAtPair

    val updates =
        if (body.title != null) requestUpdates + (Article::slug.name to body.title.toSlug())
        else requestUpdates

    val updated = articles.updateOne(slug, updates)

    if (updated) {
        val article = checkNotNull(articles.findOne(slug))
        val content = ArticleCreationResponseRoot(article, principal.subject)
        ok(content, charset = UTF_8)
    }
    else {
        halt(500, "Article $slug not updated")
    }
}

internal fun Call.deleteArticle(jwt: Jwt, articles: Store<Article, String>) {
    requirePrincipal(jwt)
    val slug = pathParameters.require("slug")
    if (!articles.deleteOne(slug))
        halt(404, "Article $slug not found")
    else
        ok(OkResponse("Article $slug deleted"), charset = UTF_8)
}

internal fun Call.getFeed(jwt: Jwt, users: Store<User, String>, articles: Store<Article, String>) {
    val principal = requirePrincipal(jwt)
    val user = users.findOne(principal.subject) ?: halt(404)

    val feedArticles = if(user.following.isEmpty()) {
        ArticlesResponseRoot(emptyList(), 0)
    }
    else {
        val filter = mapOf(Article::author.name to (user.following.toList()))
        searchArticles(users, articles, principal.subject, filter)
    }

    ok(feedArticles, charset = UTF_8)
}

internal fun String.toSlug() =
    this.lowercase().replace(' ', '-')

internal fun Call.searchArticles(
    users: Store<User, String>,
    articles: Store<Article, String>,
    subject: String?,
    filter: Map<String, *>
): ArticlesResponseRoot {

    val sort = mapOf(Article::createdAt.name to false)
    val queryParameters = request.queryParameters
    val limit = queryParameters["limit"]?.first()?.code ?: 20
    val offset = queryParameters["offset"]?.first()?.code ?: 0
    val allArticles = articles.findMany(filter, limit, offset, sort)
    val userNames = allArticles.map { it.author } + subject
    val authors = users.findMany(mapOf(User::username.name to userNames))
    val authorsMap = authors.map { it.username to it }.toMap()
    val user = authorsMap[subject]
    val responses = allArticles.map {
        val authorUsername = it.author
        val author = authorsMap[authorUsername]
        ArticleResponse(
            slug = it.slug,
            title = it.title,
            description = it.description,
            body = it.body,
            tagList = it.tagList,
            createdAt = it.createdAt.toIso8601(),
            updatedAt = it.updatedAt.toIso8601(),
            favorited = it.favoritedBy.contains(subject),
            favoritesCount = it.favoritedBy.size,
            author = AuthorResponse(
                username = authorUsername,
                bio = author?.bio ?: "",
                image = author?.image?.toString() ?: "",
                following = user?.following?.contains(authorUsername) ?: false
            )
        )
    }

    return ArticlesResponseRoot(responses, articles.count(filter))
}
