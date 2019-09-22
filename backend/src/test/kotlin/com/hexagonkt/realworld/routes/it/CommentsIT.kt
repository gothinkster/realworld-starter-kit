package com.hexagonkt.realworld.routes.it

import com.hexagonkt.http.client.Client
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.messages.CommentRequest
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.Json
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS
import java.net.URL

@TestInstance(PER_CLASS)
class CommentsIT {

    private val jake = User(
        username = "jake",
        email = "jake@jake.jake",
        password = "jakejake",
        bio = "I work at statefarm",
        image = URL("https://i.pravatar.cc/150?img=3")
    )

    private val trainDragon = Article(
        title = "How to train your dragon",
        slug = "how-to-train-your-dragon",
        description = "Ever wonder how?",
        body = "Very carefully.",
        tagList = setOf("dragons","training"),
        author = jake.username
    )

    @BeforeAll fun startup() {
        main()
    }

    @AfterAll fun shutdown() {
        server.stop()
    }

    @Test fun `Delete, create and get article's comments`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val client = RealWorldClient(Client(endpoint, Json.contentType))

        val jakeClient = client.initializeUser(jake)

        jakeClient.deleteArticle(trainDragon.slug)
        jakeClient.postArticle(trainDragon)

        jakeClient.createComment(trainDragon.slug, CommentRequest("Nice film"))
        jakeClient.getComments(trainDragon.slug, 1)
        jakeClient.deleteComment(trainDragon.slug, 1)
    }

    @Test fun `Get article's comments without login`() {
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val client = RealWorldClient(Client(endpoint, Json.contentType))

        val jakeClient = client.initializeUser(jake)

        jakeClient.deleteArticle(trainDragon.slug)
        jakeClient.postArticle(trainDragon)

        jakeClient.createComment(trainDragon.slug, CommentRequest("Nice film"))
        client.getComments(trainDragon.slug, 1)
        jakeClient.createComment(trainDragon.slug, CommentRequest("Not bad"))
        client.getComments(trainDragon.slug, 1, 2)
    }

//    @Test fun `Post comment to a not created article`() {
//        val endpoint = "http://localhost:${server.runtimePort}/api"
//        val client = RealWorldClient(Client(endpoint, Json.contentType))
//
//        val jakeClient = client.initializeUser(jake)
//
//        jakeClient.createComment("non_existing_article", CommentRequest("Nice film"))
//    }
}
