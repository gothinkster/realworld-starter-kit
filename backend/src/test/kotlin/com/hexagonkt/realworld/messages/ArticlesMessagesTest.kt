package com.hexagonkt.realworld.messages

import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.Comment
import com.hexagonkt.realworld.services.User
import org.junit.jupiter.api.Test

class ArticlesMessagesTest {

    @Test fun `ArticleResponse is created from an article, a user and an author`() {

        val jake = User(
            username = "jake",
            email = "jake@jake.jake",
            password = "jakejake"
        )

        val trainDragon = Article(
            title = "How to train your dragon",
            slug = "how-to-train-your-dragon",
            description = "Ever wonder how?",
            body = "Very carefully.",
            tagList = setOf("dragons","training"),
            author = jake.username
        )

        val response = ArticleResponseRoot(trainDragon, jake, null)
        assert(!response.article.favorited)
        assert(response.article.author.bio.isEmpty())
        assert(response.article.author.image.isEmpty())
        assert(!response.article.author.following)
    }

    @Test fun `comments are created properly`() {

        val jake = User(
            username = "jake",
            email = "jake@jake.jake",
            password = "jakejake"
        )

        val trainDragon = Comment(1, jake.username, "Body")

        val response = CommentResponse(trainDragon, jake, null)
        assert(response.author.bio.isEmpty())
        assert(response.author.image.isEmpty())
        assert(!response.author.following)
    }
}
