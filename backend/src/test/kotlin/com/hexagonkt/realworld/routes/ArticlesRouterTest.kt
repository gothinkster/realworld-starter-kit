package com.hexagonkt.realworld.routes

import com.hexagonkt.helpers.CodedException
import com.hexagonkt.http.server.test.TestRequest
import com.hexagonkt.http.server.test.testCall
import com.hexagonkt.realworld.injector
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.store.Store
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test
import java.lang.IllegalStateException
import java.net.URL
import kotlin.test.assertFailsWith

class ArticlesRouterTest {

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
        author = jane.username
    )

    private val userStore = mockk<Store<User, String>>()
    private val articleStore = mockk<Store<Article, String>>()
    private val jwt = injector.inject<Jwt>()
    private val token = jwt.sign(jake.username)
    private val principal = jwt.verify(token)

    @Test fun `Favorite not found article returns 404`() {
        every { articleStore.findOne("sample") } returns null

        val request = TestRequest(pathParameters = mapOf("slug" to "sample"))
        val call = testCall(request = request)
        call.attributes["principal"] = principal

        try {
            call.favoriteArticle(userStore, articleStore, true)
            assert(false)
        }
        catch (e: CodedException) {
            assert(e.code == 404)
        }
    }

    @Test fun `Favorite not found author throws exception`() {
        every { articleStore.findOne("sample") } returns trainDragon
        every { userStore.findOne(trainDragon.author) } returns null

        val request = TestRequest(pathParameters = mapOf("slug" to "sample"))
        val call = testCall(request = request)
        call.attributes["principal"] = principal

        assertFailsWith<IllegalStateException> {
            call.favoriteArticle(userStore, articleStore, true)
        }
    }

    @Test fun `Favorite not found user throws exception`() {
        every { articleStore.findOne("sample") } returns trainDragon
        every { userStore.findOne(trainDragon.author) } returns jane
        every { userStore.findOne(jake.username) } returns null

        val request = TestRequest(pathParameters = mapOf("slug" to "sample"))
        val call = testCall(request = request)
        call.attributes["principal"] = principal

        assertFailsWith<IllegalStateException> {
            call.favoriteArticle(userStore, articleStore, true)
        }
    }

    @Test fun `Favorite failing to update article returns 500`() {
        every { articleStore.findOne("sample") } returns trainDragon
        every { userStore.findOne(trainDragon.author) } returns jane
        every { userStore.findOne(jake.username) } returns jake
        every { articleStore.updateOne("sample", any<Map<String, *>>()) } returns false

        val request = TestRequest(pathParameters = mapOf("slug" to "sample"))
        val call = testCall(request = request)
        call.attributes["principal"] = principal

        try {
            call.favoriteArticle(userStore, articleStore, true)
            assert(false)
        }
        catch (e: CodedException) {
            assert(e.code == 500)
        }
    }
}
