package com.hexagonkt.realworld

import com.hexagonkt.helpers.require
import com.hexagonkt.http.server.*
import com.hexagonkt.http.server.jetty.JettyServletAdapter
import com.hexagonkt.http.server.servlet.ServletServer
import com.hexagonkt.injection.InjectionManager
import com.hexagonkt.serialization.Json
import com.hexagonkt.serialization.parse
import com.hexagonkt.serialization.serialize
import com.hexagonkt.settings.SettingsManager
import com.hexagonkt.store.Store
import com.hexagonkt.store.mongodb.MongoDbStore
import javax.servlet.annotation.WebListener

internal val injector = InjectionManager.apply {
    bindObject<ServerPort>(JettyServletAdapter())

    val mongodbUrl = SettingsManager.settings.require("mongodbUrl").toString()
    val userStore = MongoDbStore(User::class, User::username, mongodbUrl)
    val articleStore = MongoDbStore(Article::class, Article::slug, mongodbUrl)

    bindObject<Store<User, String>>(User::class, userStore)
    bindObject<Store<Article, String>>(Article::class, articleStore)
}

internal val router: Router = Router {

    val users: Store<User, String> = injector.inject<Store<User, String>>(User::class)
    val articles: Store<Article, String> = injector.inject<Store<Article, String>>(Article::class)

    cors()

    path("/users") {
        post("/login") { empty() }

        post {
            val user = request.body.parse(WrappedUsersPostRequest::class, requestFormat).user

            val key = users.insertOne(User(user.username, user.email))

            response.body = WrappedUsersPostResponse(UsersPostResponse(
                email = user.email,
                username = user.username,
                bio = "bio",
                image = "http://example.com",
                token = "token"
            )).serialize(responseFormat)
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

    after {
        response.contentType = "${Json.contentType};charset=utf-8"
    }
}

fun Call.empty() {
    ok("${request.method} ${request.path}")
}

@WebListener
@Suppress("unused")
class WebApplication : ServletServer(router)

internal val server: Server = Server(injector.inject(), router, SettingsManager.settings)

internal fun main() {
    server.start()
}
