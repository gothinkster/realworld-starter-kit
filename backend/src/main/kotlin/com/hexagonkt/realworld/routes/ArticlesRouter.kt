package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.injector
import com.hexagonkt.realworld.messages.*
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.convertToMap
import com.hexagonkt.store.Store
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME

import kotlin.text.Charsets.UTF_8

internal val articlesRouter = Router {
    val jwt: Jwt = injector.inject()
    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)
    val articles: Store<Article, String> = injector.inject<Store<Article, String>>(Article::class)

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
    val slug = pathParameters["slug"]
    val article = articles.findOne(slug) ?: halt(404)
    val author = checkNotNull(users.findOne(article.author))
    val user = checkNotNull(users.findOne(principal.subject)) // Both can be fetched with one 'find'
    // TODO Updates fail if not formatted as string
    val updatedAt = LocalDateTime.now().format(ISO_LOCAL_DATE_TIME)
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
    val article = articles.findOne(pathParameters["slug"]) ?: halt(404)
    val author = checkNotNull(users.findOne(article.author))
    val user = users.findOne(principal?.subject ?: "")

    ok(ArticleResponseRoot(article, author, user), charset = UTF_8)
}

internal fun Call.updateArticle(jwt: Jwt, articles: Store<Article, String>) {
    val principal = requirePrincipal(jwt)
    val body = request.body<PutArticleRequestRoot>().article
    val slug = pathParameters["slug"]

    // TODO Fails if not formatted as string
    val updatedAt = LocalDateTime.now().format(ISO_LOCAL_DATE_TIME)
    val updatedAtPair = Article::updatedAt.name to updatedAt
    val requestUpdates = body.convertToMap().mapKeys { it.key.toString() } + updatedAtPair

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
    val slug = pathParameters["slug"]
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
    this.toLowerCase().replace(' ', '-')

internal fun Call.searchArticles(
    users: Store<User, String>,
    articles: Store<Article, String>,
    subject: String?,
    filter: Map<String, *>
): ArticlesResponseRoot {

    val sort = mapOf(Article::createdAt.name to false)
    val queryParameters = request.queryParameters
    val limit = queryParameters["limit"]?.first()?.toInt() ?: 20
    val offset = queryParameters["offset"]?.first()?.toInt() ?: 0
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
