package com.hexagonkt.realworld.routes

import com.hexagonkt.http.client.Client
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.Json
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import org.junit.*
import java.net.URL

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

    companion object {
        @BeforeClass @JvmStatic fun startup() {
            main()
        }

        @AfterClass @JvmStatic fun shutdown() {
            server.stop()
        }
    }

    @Test fun `Delete, create and get an article`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val client = RealWorldClient(Client(endpoint, Json.contentType))

        val jakeClient = client.initializeUser(jake)
        val janeClient = client.initializeUser(jane)

        jakeClient.deleteArticle(trainDragon.slug)
        jakeClient.postArticle(trainDragon)
        jakeClient.getArticle(trainDragon.slug)
    }
}
