package com.hexagonkt.realworld

import com.auth0.jwt.interfaces.DecodedJWT
import com.hexagonkt.helpers.Resource
import com.hexagonkt.helpers.require
import com.hexagonkt.http.server.*
import com.hexagonkt.http.server.jetty.JettyServletAdapter
import com.hexagonkt.http.server.servlet.ServletServer
import com.hexagonkt.injection.InjectionManager
import com.hexagonkt.settings.SettingsManager.settings
import com.hexagonkt.store.IndexOrder.ASCENDING
import com.hexagonkt.store.Store
import com.hexagonkt.store.mongodb.MongoDbStore
import javax.servlet.annotation.WebListener
import kotlin.text.Charsets.UTF_8

internal val injector = InjectionManager {
    // HTTP
    bindObject<ServerPort>(JettyServletAdapter())

    // JWT
    val keyStoreResource = settings.require("keyStoreResource").toString()
    val keyStorePassword = settings.require("keyStorePassword").toString()
    val keyPairAlias = settings.require("keyPairAlias").toString()

    bindObject(Jwt(Resource(keyStoreResource), keyStorePassword, keyPairAlias))

    // DB
    val mongodbUrl = settings.require("mongodbUrl").toString()

    val userStore = MongoDbStore(User::class, User::username, mongodbUrl)
    userStore.createIndex(true, User::email.name to ASCENDING)

    val articleStore = MongoDbStore(Article::class, Article::slug, mongodbUrl)

    bindObject<Store<User, String>>(User::class, userStore)
    bindObject<Store<Article, String>>(Article::class, articleStore)
}

internal val router: Router = Router {

    val jwt: Jwt = injector.inject()

    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)
    val articles: Store<Article, String> = injector.inject<Store<Article, String>>(Article::class)

    cors()

    path("/users") {
        delete("/{username}") { users.deleteOne(pathParameters["username"]) }

        post("/login") {
            val bodyUser = request.body<WrappedUsersLoginPostRequest>().user
            val filter = mapOf(User::email.name to bodyUser.email)
            val user = users.findOne(filter) ?: halt(404, "Not Found")
            val content = WrappedUsersLoginPostResponse(
                UsersLoginPostResponse(
                    email = user.email,
                    username = user.username,
                    bio = user.bio ?: "",
                    image = user.image?.toString() ?: "",
                    token = jwt.sign(user.username)
                )
            )

            ok(content, charset = UTF_8)
        }

        post {
            val user = request.body<WrappedUsersPostRequest>().user
            val key = users.insertOne(User(user.username, user.email))
            val content = WrappedUsersPostResponse(
                UsersPostResponse(
                    email = user.email,
                    username = key,
                    bio = "",
                    image = "",
                    token = jwt.sign(key)
                )
            )

            ok(content, charset = UTF_8)
        }
    }

    // TODO Check how to place this nested in '/user' path
    before("/user") {
        val token = request.headers["Authorization"]?.firstOrNull() ?: halt(401, "Unauthorized")
        val principal = jwt.verify(token.removePrefix("Token").trim())
        attributes["principal"] = principal
    }

    path("/user") {

        get {
            val principal = attributes["principal"] as DecodedJWT
            val user = users.findOne(principal.subject) ?: halt(404, "Not Found")
            val content = WrappedUsersPostResponse(
                UsersPostResponse(
                    email = user.email,
                    username = user.username,
                    bio = user.bio ?: "",
                    image = user.image?.toString() ?: "",
                    token = jwt.sign(user.username)
                )
            )

            ok(content, charset = UTF_8)
        }

        put { empty() }
    }

    path("/profiles/{username}") {
        post("/follow") { empty() }
        delete("/follow") { empty() }

        get { empty() }
    }

    path("/articles") {
        get("/feed") { empty() }
        get { empty() }
        post { empty() }

        path("/{slug}") {
            get { empty() }
            put { empty() }
            delete { empty() }

            path("/favorite") {
                post { empty() }
                delete { empty() }
            }

            path("/comments") {
                post { empty() }
                get { empty() }
                delete("/{id}") { empty() }
            }
        }
    }

    get("/tags") { empty() }
}

fun Call.empty() {
    ok("${request.method} ${request.path}", charset = UTF_8)
}

@WebListener
@Suppress("unused")
class WebApplication : ServletServer(router)

internal val server: Server = Server(injector.inject(), router, settings)

internal fun main() {
    server.start()
}
