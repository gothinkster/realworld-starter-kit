package com.hexagonkt.realworld

import com.hexagonkt.helpers.withZone
import com.hexagonkt.http.server.*
import com.hexagonkt.http.server.jetty.JettyServletAdapter
import com.hexagonkt.http.server.servlet.ServletServer
import com.hexagonkt.injection.InjectionManager
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.routes.*
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.settings.SettingsManager
import com.hexagonkt.store.Store
import com.hexagonkt.store.mongodb.MongoDbStore
import java.net.URL
import java.time.LocalDateTime
import java.time.ZoneOffset.UTC
import java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME
import javax.servlet.annotation.WebListener

internal val injector = InjectionManager.apply {
    bind(createJwt())
    bind<ServerPort>(JettyServletAdapter())
    bind(User::class, createUserStore())
    bind(Article::class, createArticleStore())
}

/**
 * This class is the application's Servlet shell. It allows this application to be bundled
 * in a WAR file and be deployed in any JEE server.
 */
@WebListener
@Suppress("unused")
class WebApplication : ServletServer(router)

internal val server: Server = Server(injector.inject(), router, SettingsManager.settings.convertToObject())

private fun createJwt(): Jwt {
    val keyStoreResource = SettingsManager.settings.require("keyStoreResource").toString()
    val keyStorePassword = SettingsManager.settings.require("keyStorePassword").toString()
    val keyPairAlias = SettingsManager.settings.require("keyPairAlias").toString()

    return Jwt(URL(keyStoreResource), keyStorePassword, keyPairAlias)
}

private fun createUserStore(): Store<User, String> {
    val mongodbUrl = SettingsManager.settings.require("mongodbUrl").toString()
    val userStore = MongoDbStore(User::class, User::username, mongodbUrl)
    userStore.createIndex(true, User::email)

    return userStore
}

private fun createArticleStore(): Store<Article, String> {
    val mongodbUrl = SettingsManager.settings.require("mongodbUrl").toString()
    val articleStore = MongoDbStore(Article::class, Article::slug, mongodbUrl)
    articleStore.createIndex(false, Article::author)

    return articleStore
}

internal fun LocalDateTime.toIso8601() =
    withZone().withZoneSameInstant(UTC).format(ISO_LOCAL_DATE_TIME) + "Z"

internal fun main() {
    server.start()
}
