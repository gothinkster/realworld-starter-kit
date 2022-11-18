package com.hexagonkt.realworld

import com.hexagonkt.core.*
import com.hexagonkt.core.Jvm.systemSetting
import com.hexagonkt.core.Jvm.systemSettingOrNull
import com.hexagonkt.core.converters.ConvertersManager
import com.hexagonkt.core.converters.convert
import com.hexagonkt.core.logging.LoggingManager
import com.hexagonkt.http.server.*
import com.hexagonkt.http.server.jetty.JettyServletAdapter
import com.hexagonkt.http.server.servlet.ServletServer
import com.hexagonkt.logging.slf4j.jul.Slf4jJulLoggingAdapter
import com.hexagonkt.realworld.routes.*
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.Comment
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.SerializationManager
import com.hexagonkt.serialization.jackson.json.Json
import com.hexagonkt.store.Store
import com.hexagonkt.store.mongodb.MongoDbStore
import com.mongodb.client.model.IndexOptions
import com.mongodb.client.model.Indexes
import java.net.URL
import jakarta.servlet.annotation.WebListener

/**
 * This class is the application's Servlet shell. It allows this application to be bundled
 * in a WAR file and be deployed in any JEE server.
 */
@WebListener
@Suppress("unused")
class WebApplication : ServletServer(router) {
    init {
        setUp()
    }
}

internal val bindAddress = systemSettingOrNull("bindAddress") ?: loopbackInterface
internal val bindPort = systemSettingOrNull("bindPort") ?: 2010
internal val serverSettings = HttpServerSettings(bindAddress, bindPort, "/api")
internal val serverAdapter = JettyServletAdapter()
internal val server: HttpServer by lazy { HttpServer(serverAdapter, router, serverSettings) }
internal val jwt: Jwt by lazy { createJwt() }
internal val users: Store<User, String> by lazy { createUserStore() }
internal val articles: Store<Article, String> by lazy { createArticleStore() }

internal fun createJwt(): Jwt {
    val keyStoreResource = systemSettingOrNull("keyStoreResource") ?: "classpath:keystore.p12"
    val keyStorePassword = systemSettingOrNull("keyStorePassword") ?: "storepass"
    val keyPairAlias = systemSettingOrNull("keyPairAlias") ?: "realWorld"

    return Jwt(URL(keyStoreResource), keyStorePassword, keyPairAlias)
}

internal fun createUserStore(): Store<User, String> {
    val mongodbUrl = systemSetting<String>("mongodbUrl")
    val userStore = MongoDbStore(User::class, User::username, mongodbUrl)
    val indexField = User::email.name
    val indexOptions = IndexOptions().unique(true).background(true).name(indexField)
    userStore.collection.createIndex(Indexes.ascending(indexField), indexOptions)

    ConvertersManager.register(User::class to Map::class) {
        fieldsMapOfNotNull(
            User::username to it.username,
            User::email to it.email,
            User::password to it.password,
            User::bio to it.bio,
            User::image to it.image,
            User::following to it.following,
        )
    }
    ConvertersManager.register(Map::class to User::class) {
        User(
            username = it.requireString(User::username),
            email = it.requireString(User::email),
            password = it.requireString(User::password),
            bio = it.getString(User::bio),
            image = it.getString(User::image)?.let(::URL),
            following = it.getStringsOrEmpty(User::following).toSet(),
        )
    }

    return userStore
}

internal fun createArticleStore(): Store<Article, String> {
    val mongodbUrl = systemSetting<String>("mongodbUrl")
    val articleStore = MongoDbStore(Article::class, Article::slug, mongodbUrl)
    val indexField = Article::author.name
    val indexOptions = IndexOptions().unique(false).background(true).name(indexField)
    articleStore.collection.createIndex(Indexes.ascending(indexField), indexOptions)

    ConvertersManager.register(Comment::class to Map::class) {
        fieldsMapOfNotNull(
            Comment::id to it.id,
            Comment::author to it.author,
            Comment::body to it.body,
            Comment::createdAt to it.createdAt,
            Comment::updatedAt to it.updatedAt,
        )
    }
    ConvertersManager.register(Map::class to Comment::class) {
        Comment(
            id = it.requireInt(Comment::id),
            author = it.requireString(Comment::author),
            body = it.requireString(Comment::body),
            createdAt = it.requireKey(Comment::createdAt),
            updatedAt = it.requireKey(Comment::updatedAt),
        )
    }
    ConvertersManager.register(Article::class to Map::class) {
        fieldsMapOfNotNull(
            Article::slug to it.slug,
            Article::author to it.author,
            Article::title to it.title,
            Article::description to it.description,
            Article::body to it.body,
            Article::tagList to it.tagList,
            Article::createdAt to it.createdAt,
            Article::updatedAt to it.updatedAt,
            Article::favoritedBy to it.favoritedBy,
            Article::comments to it.comments.map { m -> m.convert(Map::class) },
        )
    }
    ConvertersManager.register(Map::class to Article::class) {
        Article(
            slug = it.requireString(Article::slug),
            author = it.requireString(Article::author),
            title = it.requireString(Article::title),
            description = it.requireString(Article::description),
            body = it.requireString(Article::body),
            tagList = it.getStringsOrEmpty(Article::tagList).let(::LinkedHashSet),
            createdAt = it.requireKey(Comment::createdAt),
            updatedAt = it.requireKey(Comment::updatedAt),
            favoritedBy = it.getStringsOrEmpty(Article::favoritedBy).toSet(),
            comments = it.getMapsOrEmpty(Article::comments).map { m -> m.convert(Comment::class) },
        )
    }

    return articleStore
}

private fun setUp() {
    LoggingManager.adapter = Slf4jJulLoggingAdapter()
    SerializationManager.defaultFormat = Json
}

internal fun main() {
    setUp()
    server.start()
}
