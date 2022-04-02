package com.hexagonkt.realworld.routes.it

import com.hexagonkt.http.client.Client
import com.hexagonkt.http.client.ClientSettings
import com.hexagonkt.http.client.ahc.AhcAdapter
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.messages.PutArticleRequest
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.json.Json
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS
import java.net.URL

@TestInstance(PER_CLASS)
class ArticlesIT {

    private val jake = User(
        username = "jake",
        email = "jake@jake.jake",
        password = "jakejake",
        bio = "I work at statefarm",
        image = URL("https://i.pravatar.cc/150?img=3")
    )

    private val jane = User(
        username = "jane",
        email = "jane@jane.jane",
        password = "janejane",
        bio = "I own MegaCloud",
        image = URL("https://i.pravatar.cc/150?img=1")
    )

    private val trainDragon = Article(
        title = "How to train your dragon",
        slug = "how-to-train-your-dragon",
        description = "Ever wonder how?",
        body = "Very carefully.",
        tagList = setOf("dragons","training"),
        author = jake.username
    )

    private val neverEndingStory = Article(
        title = "Never Ending Story",
        slug = "never-ending-story",
        description = "Fantasia is dying",
        body = "Fight for Fantasia!",
        tagList = setOf("dragons", "books"),
        author = jake.username
    )

    @BeforeAll fun startup() {
        main()
    }

    @AfterAll fun shutdown() {
        server.stop()
    }

    @Test fun `Delete, create update and get an article`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val settings = ClientSettings(Json.contentType)
        val client = RealWorldClient(Client(AhcAdapter(), endpoint, settings))

        val jakeClient = client.initializeUser(jake)

        jakeClient.deleteArticle(trainDragon.slug)
        jakeClient.postArticle(trainDragon)
        jakeClient.updateArticle(trainDragon, PutArticleRequest())
        jakeClient.updateArticle(trainDragon, PutArticleRequest(body = "With your bare hands"))
        jakeClient.getArticle(trainDragon.slug)
    }

    @Test fun `Favorite and un-favorite articles`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val settings = ClientSettings(Json.contentType)
        val client = RealWorldClient(Client(AhcAdapter(), endpoint, settings))
        val user = jake.username

        val jakeClient = client.initializeUser(jake)
        val janeClient = client.initializeUser(jane)

        janeClient.deleteArticle(trainDragon.slug)
        janeClient.deleteArticle(neverEndingStory.slug)
        janeClient.postArticle(trainDragon)
        janeClient.postArticle(neverEndingStory)

        jakeClient.findArticles(favorited = user, expected = emptySet())

        jakeClient.favoriteArticle(trainDragon, true)
        jakeClient.findArticles(favorited = user, expected = setOf(trainDragon))

        jakeClient.favoriteArticle(neverEndingStory, true)
        jakeClient.findArticles(favorited = user, expected = setOf(trainDragon, neverEndingStory))

        jakeClient.favoriteArticle(trainDragon, false)
        jakeClient.findArticles(favorited = user, expected = setOf(neverEndingStory))

        jakeClient.favoriteArticle(neverEndingStory, false)
        jakeClient.findArticles(favorited = user, expected = emptySet())
    }

    @Test fun `Find articles filters correctly`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val settings = ClientSettings(Json.contentType)
        val client = RealWorldClient(Client(AhcAdapter(), endpoint, settings))

        val jakeClient = client.initializeUser(jake)
        val janeClient = client.initializeUser(jane)

        jakeClient.deleteArticle(trainDragon.slug)
        jakeClient.deleteArticle(neverEndingStory.slug)

        jakeClient.postArticle(trainDragon)
        janeClient.postArticle(neverEndingStory)
        jakeClient.favoriteArticle(neverEndingStory, true)
        janeClient.favoriteArticle(trainDragon, true)

        val clients = listOf(client, jakeClient, janeClient)

        clients.forEach {
            it.findArticles(author = "jake", expected = setOf(trainDragon))
            it.findArticles(author = "jane", expected = setOf(neverEndingStory))
            it.findArticles(author = "john", expected = emptySet())
        }

        clients.forEach {
            it.findArticles(tag = "dragons", expected = setOf(trainDragon, neverEndingStory))
            it.findArticles(tag = "training", expected = setOf(trainDragon))
            it.findArticles(tag = "books", expected = setOf(neverEndingStory))
            it.findArticles(tag = "other", expected = emptySet())
        }

        clients.forEach {
            it.findArticles(favorited = jake.username, expected = setOf(neverEndingStory))
            it.findArticles(favorited = jane.username, expected = setOf(trainDragon))
            it.findArticles(favorited = "john", expected = emptySet())
        }
    }

    @Test fun `Get user feed`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val settings = ClientSettings(Json.contentType)
        val client = RealWorldClient(Client(AhcAdapter(), endpoint, settings))

        val jakeClient = client.initializeUser(jake)
        val janeClient = client.initializeUser(jane)

        janeClient.deleteArticle(trainDragon.slug)
        janeClient.deleteArticle(neverEndingStory.slug)

        jakeClient.getFeed()
        jakeClient.followProfile(jane, true)
        jakeClient.getFeed()
        janeClient.postArticle(trainDragon)
        jakeClient.getFeed(trainDragon)
        janeClient.postArticle(neverEndingStory)
        jakeClient.getFeed(trainDragon, neverEndingStory)
        janeClient.deleteArticle(trainDragon.slug)
        jakeClient.getFeed(neverEndingStory)
    }
}
