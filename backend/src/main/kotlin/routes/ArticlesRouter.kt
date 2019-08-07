package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.helpers.withZone
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

internal val articlesRouter = Router {
    val jwt: Jwt = injector.inject()
    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)
    val articles: Store<Article, String> = injector.inject<Store<Article, String>>(Article::class)

    authenticate(jwt)

    get("/feed") {
        val principal = attributes["principal"] as DecodedJWT
    }

    path("/{slug}") {
        delete {
            if (!articles.deleteOne(pathParameters["slug"]))
                halt(500)
        }

        put {
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
                val content = ArticleCreationResponseRoot(
                    ArticleCreationResponse(
                        slug = article.slug,
                        title = article.title,
                        description = article.description,
                        body = article.body,
                        tagList = article.tagList,
                        createdAt = article.createdAt.toIso8601(),
                        updatedAt = article.updatedAt.toIso8601(),
                        favorited = article.favoritedBy.contains(principal.subject),
                        favoritesCount = article.favoritedBy.size,
                        author = article.author
                    )
                )

                ok(content, charset = Charsets.UTF_8)
            } else {
                send(500, "Article $slug not updated")
            }
        }

        get { }

        path("/favorite") {
            post { }
            delete { }
        }

        path("/comments") {
            post { }
            get { }
            delete("/{id}") { }
        }
    }

    post {
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

        val content = ArticleCreationResponseRoot(
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
                author = principal.subject
            )
        )

        ok(content, charset = Charsets.UTF_8)
    }

    get {
        val principal = attributes["principal"] as DecodedJWT

        // Get user

        // Get query params

        val all = articles.findAll()
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

        ok(ArticlesResponseRoot(responses, articles.count()), charset = Charsets.UTF_8)
    }
}

private fun String.toSlug() =
    this.toLowerCase().replace(' ', '-')

private fun LocalDateTime.toIso8601() =
    this.withZone().withZoneSameInstant(ZoneOffset.UTC).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "Z"
