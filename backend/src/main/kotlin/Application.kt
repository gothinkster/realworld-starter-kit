package com.hexagonkt.realworld

import com.hexagonkt.helpers.require
import com.hexagonkt.http.server.*
import com.hexagonkt.http.server.jetty.JettyServletAdapter
import com.hexagonkt.http.server.servlet.ServletServer
import com.hexagonkt.injection.InjectionManager
import com.hexagonkt.settings.SettingsManager
import com.hexagonkt.store.IndexOrder.ASCENDING
import com.hexagonkt.store.Store
import com.hexagonkt.store.mongodb.MongoDbStore
import javax.servlet.annotation.WebListener
import kotlin.text.Charsets.UTF_8

internal val injector = InjectionManager {
    bindObject<ServerPort>(JettyServletAdapter())

    val mongodbUrl = SettingsManager.settings.require("mongodbUrl").toString()

    val userStore = MongoDbStore(User::class, User::username, mongodbUrl)
    userStore.createIndex(true, User::email.name to ASCENDING)

    val articleStore = MongoDbStore(Article::class, Article::slug, mongodbUrl)

    bindObject<Store<User, String>>(User::class, userStore)
    bindObject<Store<Article, String>>(Article::class, articleStore)
}

internal val router: Router = Router {

    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)
    val articles: Store<Article, String> = injector.inject<Store<Article, String>>(Article::class)

    cors()

    path("/users") {
        delete("/{username}") { users.deleteOne(pathParameters["username"]) }

        post("/login") {
            val user = request.body<WrappedUsersLoginPostRequest>().user
            val key = users.findOne(mapOf(User::email.name to user.email)) ?: halt(404, "Not Found")
            val content = WrappedUsersLoginPostResponse(
                UsersLoginPostResponse(
                    email = key.email,
                    username = key.username,
                    bio = key.bio ?: "",
                    image = key.image?.toString() ?: "",
                    token = "token"
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
                    bio = "bio",
                    image = "http://example.com",
                    token = "token"
                )
            )

            ok(content, charset = UTF_8)
        }
    }

    path("/user") {
        get { empty() }
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

internal val server: Server = Server(injector.inject(), router, SettingsManager.settings)

internal fun main() {
    server.start()
}
