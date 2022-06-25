package com.hexagonkt.realworld

import com.hexagonkt.core.Jvm
import com.hexagonkt.http.server.*
import com.hexagonkt.http.server.jetty.JettyServletAdapter
import com.hexagonkt.http.server.servlet.ServletServer
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.routes.*
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
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

internal val server: HttpServer by lazy { HttpServer(JettyServletAdapter(), router) }
internal val jwt: Jwt by lazy { createJwt() }
internal val users: Store<User, String> by lazy { createUserStore() }
internal val articles: Store<Article, String> by lazy { createArticleStore() }

internal fun createJwt(): Jwt {
    val keyStoreResource = Jvm.systemSettingOrNull<String>("keyStoreResource") ?: error("resource")
    val keyStorePassword = Jvm.systemSettingOrNull<String>("keyStorePassword") ?: error("password")
    val keyPairAlias = Jvm.systemSettingOrNull<String>("keyPairAlias") ?: error("alias")

    return Jwt(URL(keyStoreResource), keyStorePassword, keyPairAlias)
}

internal fun createUserStore(): Store<User, String> {
    val mongodbUrl = Jvm.systemSettingOrNull<String>("mongodbUrl") ?: error("dbUrl")
    val userStore = MongoDbStore(User::class, User::username, mongodbUrl)
    userStore.createIndex(true, User::email)

    return userStore
}

internal fun createArticleStore(): Store<Article, String> {
    val mongodbUrl = Jvm.systemSettingOrNull<String>("mongodbUrl") ?: error("dbUrl")
    val articleStore = MongoDbStore(Article::class, Article::slug, mongodbUrl)
    articleStore.createIndex(false, Article::author)

    return articleStore
}

internal fun main() {
    server.start()
}
