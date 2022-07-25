package com.hexagonkt.realworld.routes.it

import com.hexagonkt.core.media.ApplicationMedia
import com.hexagonkt.http.client.HttpClient
import com.hexagonkt.http.client.HttpClientSettings
import com.hexagonkt.http.client.jetty.JettyClientAdapter
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.jackson.json.Json
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS
import java.net.URL

@TestInstance(PER_CLASS)
class TagsIT {

    private val jake = User(
        username = "jake",
        email = "jake@jake.jake",
        password = "jakejake",
        bio = "I work at statefarm",
        image = URL("https://i.pravatar.cc/150?img=3")
    )

    private val neverEndingStory = Article(
        title = "Never Ending Story",
        slug = "never-ending-story",
        description = "Fantasia is dying",
        body = "Fight for Fantasia!",
        tagList = setOf("dragons", "books"),
        author = jake.username
    )

    private val trainDragon = Article(
        title = "How to train your dragon",
        slug = "how-to-train-your-dragon",
        description = "Ever wonder how?",
        body = "Very carefully.",
        tagList = setOf("dragons", "training"),
        author = jake.username
    )

    @BeforeAll fun startup() {
        System.setProperty("keyStoreResource", "classpath:keystore.p12")
        System.setProperty("keyStorePassword", "storepass")
        System.setProperty("keyPairAlias", "realWorld")
        System.setProperty("mongodbUrl", "mongodb://localhost:3010/real_world")

        main()
    }

    @AfterAll fun shutdown() {
        server.stop()
    }

    @Test fun `Get all tags don't return duplicates`() {
        val endpoint = URL("http://localhost:${server.runtimePort}/api")
        val settings = HttpClientSettings(endpoint, ContentType(ApplicationMedia.JSON))
        val client = RealWorldClient(HttpClient(JettyClientAdapter(), settings))

        val jakeClient = client.initializeUser(jake)

        jakeClient.deleteArticle(trainDragon.slug)
        jakeClient.deleteArticle(neverEndingStory.slug)
        client.getTags()

        jakeClient.postArticle(trainDragon)
        client.getTags("dragons", "training")

        jakeClient.postArticle(neverEndingStory)
        client.getTags("dragons", "training", "books")

        jakeClient.deleteArticle(trainDragon.slug)
        client.getTags("dragons", "books")

        jakeClient.deleteArticle(neverEndingStory.slug)
        client.getTags()
    }
}
