package com.hexagonkt.realworld

import com.hexagonkt.core.Jvm.systemSetting
import com.hexagonkt.http.server.*
import com.hexagonkt.http.server.jetty.JettyServletAdapter
import com.hexagonkt.http.server.servlet.ServletServer
import com.hexagonkt.realworld.routes.*
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.SerializationManager
import com.hexagonkt.serialization.jackson.json.Json
import com.hexagonkt.store.Store
import com.hexagonkt.store.mongodb.MongoDbStore
import java.net.URL
import jakarta.servlet.annotation.WebListener

/**
 * This class is the application's Servlet shell. It allows this application to be bundled
 * in a WAR file and be deployed in any JEE server.
 */
@WebListener
@Suppress("unused")
class WebApplication : ServletServer(router)

internal val serverSettings = HttpServerSettings(contextPath = "/api")
internal val serverAdapter = JettyServletAdapter()
internal val server: HttpServer by lazy { HttpServer(serverAdapter, router, serverSettings) }
internal val jwt: Jwt by lazy { createJwt() }
internal val users: Store<User, String> by lazy { createUserStore() }
internal val articles: Store<Article, String> by lazy { createArticleStore() }

internal fun createJwt(): Jwt {
    val keyStoreResource = systemSetting<String>("keyStoreResource")
    val keyStorePassword = systemSetting<String>("keyStorePassword")
    val keyPairAlias = systemSetting<String>("keyPairAlias")

    return Jwt(URL(keyStoreResource), keyStorePassword, keyPairAlias)
}

internal fun createUserStore(): Store<User, String> {
    val mongodbUrl = systemSetting<String>("mongodbUrl")
    val userStore = MongoDbStore(User::class, User::username, mongodbUrl)
    userStore.createIndex(true, User::email)

    return userStore
}

internal fun createArticleStore(): Store<Article, String> {
    val mongodbUrl = systemSetting<String>("mongodbUrl")
    val articleStore = MongoDbStore(Article::class, Article::slug, mongodbUrl)
    articleStore.createIndex(false, Article::author)

    return articleStore
}

internal fun main() {
    SerializationManager.defaultFormat = Json
    server.start()
}
