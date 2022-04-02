package com.hexagonkt.realworld

import com.hexagonkt.core.helpers.Jvm
import com.hexagonkt.core.helpers.fail
import com.hexagonkt.core.helpers.withZone
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
import java.time.LocalDateTime
import java.time.ZoneOffset.UTC
import java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME
import javax.servlet.annotation.WebListener

/**
 * This class is the application's Servlet shell. It allows this application to be bundled
 * in a WAR file and be deployed in any JEE server.
 */
@WebListener
@Suppress("unused")
class WebApplication : ServletServer(router)

internal val server: Server = Server(JettyServletAdapter(), router, ServerSettings())

internal fun createJwt(): Jwt {
    val keyStoreResource = Jvm.systemSetting<String>("keyStoreResource") ?: error("resource")
    val keyStorePassword = Jvm.systemSetting<String>("keyStorePassword") ?: error("password")
    val keyPairAlias = Jvm.systemSetting<String>("keyPairAlias") ?: error("alias")

    return Jwt(URL(keyStoreResource), keyStorePassword, keyPairAlias)
}

internal fun createUserStore(): Store<User, String> {
    val mongodbUrl = Jvm.systemSetting<String>("mongodbUrl") ?: error("dbUrl")
    val userStore = MongoDbStore(User::class, User::username, mongodbUrl)
    userStore.createIndex(true, User::email)

    return userStore
}

internal fun createArticleStore(): Store<Article, String> {
    val mongodbUrl = Jvm.systemSetting<String>("mongodbUrl") ?: error("dbUrl")
    val articleStore = MongoDbStore(Article::class, Article::slug, mongodbUrl)
    articleStore.createIndex(false, Article::author)

    return articleStore
}

internal fun LocalDateTime.toIso8601() =
    withZone().withZoneSameInstant(UTC).format(ISO_LOCAL_DATE_TIME) + "Z"

internal fun main() {
    server.start()
}
