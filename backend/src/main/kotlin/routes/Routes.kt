package com.hexagonkt.realworld.routes

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.helpers.withZone
import com.hexagonkt.http.server.Call
import com.hexagonkt.http.server.Router
import com.hexagonkt.realworld.injector
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.rest.cors
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.convertToMap
import com.hexagonkt.store.Store

import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME

internal val usersRouter = Router {
    val jwt: Jwt = injector.inject()
    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)

    // TODO Authenticate and require 'root' user or owner
    delete("/{username}") {
        if (users.deleteOne(pathParameters["username"])) ok() else send(404)
    }

    post("/login") {
        val bodyUser = request.body<LoginRequestRoot>().user
        val filter = mapOf(User::email.name to bodyUser.email)
        val user = users.findOne(filter) ?: halt(404, "Not Found")
        if (user.password == bodyUser.password) {
            val content = UserResponseRoot(
                UserResponse(
                    email = user.email,
                    username = user.username,
                    bio = user.bio ?: "",
                    image = user.image?.toString() ?: "",
                    token = jwt.sign(user.username)
                )
            )

            ok(content, charset = Charsets.UTF_8)
        }
        else {
            send(401, "Bad credentials")
        }
    }

    post {
        val user = request.body<RegistrationRequestRoot>().user
        val key = users.insertOne(User(user.username, user.email, user.password))
        val content = UserResponseRoot(
            UserResponse(
                email = user.email,
                username = key,
                bio = "",
                image = "",
                token = jwt.sign(key)
            )
        )

        ok(content, charset = Charsets.UTF_8)
    }
}

internal val userRouter = Router {
    val jwt: Jwt = injector.inject()
    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)

    authenticate(jwt)

    get {
        val principal = attributes["principal"] as DecodedJWT
        val user = users.findOne(principal.subject) ?: halt(404, "Not Found")
        val content = UserResponseRoot(
            UserResponse(
                email = user.email,
                username = user.username,
                bio = user.bio ?: "",
                image = user.image?.toString() ?: "",
                token = jwt.sign(user.username)
            )
        )

        ok(content, charset = Charsets.UTF_8)
    }

    put {
        val principal = attributes["principal"] as DecodedJWT
        val body = request.body<PutUserRequestRoot>().user
        val updates = body.convertToMap().mapKeys { it.key.toString() }
        val updated = users.updateOne(principal.subject, updates)

        if (updated) {
            val user = users.findOne(principal.subject) ?: halt(500)
            val content = UserResponseRoot(
                UserResponse(
                    email = user.email,
                    username = user.username,
                    bio = user.bio ?: "",
                    image = user.image?.toString() ?: "",
                    token = jwt.sign(user.username)
                )
            )

            ok(content, charset = Charsets.UTF_8)
        }
        else {
            send(500, "Username ${principal.subject} not updated")
        }
    }
}

internal val profilesRouter = Router {
    val jwt: Jwt = injector.inject()
    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)

    authenticate(jwt)

    post("/follow") {
        val principal = attributes["principal"] as DecodedJWT
        val user = users.findOne(principal.subject) ?: halt(404, "Not Found")
        val updated = users.updateOne(principal.subject, mapOf("following" to user.following + pathParameters["username"]))
        val profile = users.findOne(pathParameters["username"]) ?: halt(404, "Not Found")
        val content = ProfileResponseRoot(
            ProfileResponse(
                username = profile.username,
                bio = profile.bio ?: "",
                image = profile.image?.toString() ?: "",
                following = updated
            )
        )

        ok(content, charset = Charsets.UTF_8)
    }

    delete("/follow") {
        val principal = attributes["principal"] as DecodedJWT
        val user = users.findOne(principal.subject) ?: halt(404, "Not Found")
        val updated = users.updateOne(principal.subject, mapOf("following" to user.following - pathParameters["username"]))
        val profile = users.findOne(pathParameters["username"]) ?: halt(404, "Not Found")
        val content = ProfileResponseRoot(
            ProfileResponse(
                username = profile.username,
                bio = profile.bio ?: "",
                image = profile.image?.toString() ?: "",
                following = !updated
            )
        )

        ok(content, charset = Charsets.UTF_8)
    }

    get {
        val principal = attributes["principal"] as DecodedJWT
        val user = users.findOne(principal.subject) ?: halt(404, "Not Found")
        val profile = users.findOne(pathParameters["username"]) ?: halt(404, "Not Found")
        val content = ProfileResponseRoot(
            ProfileResponse(
                username = profile.username,
                bio = profile.bio ?: "",
                image = profile.image?.toString() ?: "",
                following = user.following.contains(profile.username)
            )
        )

        ok(content, charset = Charsets.UTF_8)
    }
}

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
            val updatedAt = LocalDateTime.now().format(ISO_LOCAL_DATE_TIME) // TODO Fails if not formatted as string
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
            }
            else {
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

internal val tagsRouter = Router {
    val articles: Store<Article, String> = injector.inject<Store<Article, String>>(Article::class)

    get {}
}

internal val router: Router = Router {
    cors()
    path("/users", usersRouter)
    path("/user", userRouter)
    path("/profiles/{username}", profilesRouter)
    path("/articles", articlesRouter)
    path("/tags", tagsRouter)
}

internal fun Router.authenticate(jwt: Jwt) {
    before("/") { parsePrincipal(jwt) }
    before("/*") { parsePrincipal(jwt) }
}

private fun Call.parsePrincipal(jwt: Jwt) {
    val token = request.headers["Authorization"]?.firstOrNull() ?: halt(401, "Unauthorized")
    val principal = jwt.verify(token.removePrefix("Token").trim())
    attributes["principal"] = principal
}

internal fun String.toSlug() =
    this.toLowerCase().replace(' ', '-')

internal fun LocalDateTime.toIso8601() =
    this.withZone().withZoneSameInstant(ZoneOffset.UTC).format(ISO_LOCAL_DATE_TIME) + "Z"
