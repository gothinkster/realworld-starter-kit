package com.hexagonkt.realworld

import com.hexagonkt.core.media.ApplicationMedia.JSON
import com.hexagonkt.core.requireKeys
import com.hexagonkt.http.client.HttpClient
import com.hexagonkt.http.client.HttpClientSettings
import com.hexagonkt.http.client.model.HttpClientResponse
import com.hexagonkt.http.client.jetty.JettyClientAdapter
import com.hexagonkt.http.model.*
import com.hexagonkt.http.model.ClientErrorStatus.NOT_FOUND
import com.hexagonkt.http.model.SuccessStatus.OK
import com.hexagonkt.realworld.messages.*
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.rest.bodyMap
import kotlin.text.Charsets.UTF_8

internal class RealWorldClient(val client: HttpClient) {

    private val contentType = ContentType(JSON, charset = UTF_8)

    private fun User.toRegistrationRequest(): RegistrationRequest =
        RegistrationRequest(email, username, password)

    private fun User.toLoginRequest(): LoginRequest =
        LoginRequest(email, password)

    private fun Article.toCreationRequest(): ArticleRequest =
        ArticleRequest(title, description, body, tagList)

    fun deleteUser(user: User, allowedCodes: Set<Int> = setOf(200, 404)) {
        client.delete("/users/${user.username}").apply {
            assert(status.code in allowedCodes)
            assert(contentType == contentType)
        }
    }

    fun registerUser(user: User) {
        registerUser(user) {
            assert(status == HttpStatus[201])
            assert(contentType == contentType)

            val userResponse = UserResponse(bodyMap().requireKeys("user"))
            assert(userResponse.username == user.username)
            assert(userResponse.email == user.email)
            assert(userResponse.token.isNotBlank())
        }
    }

    fun registerUser(user: User, callback: HttpClientResponse.() -> Unit) {
        client.post("/users", user.toRegistrationRequest()).apply(callback)
    }

    fun loginUser(user: User): RealWorldClient {
        val header = client.post("/users/login", user.toLoginRequest()).let {
            assert(it.status == OK)
            assert(it.contentType == contentType)

            val userResponse = UserResponse(it.bodyMap().requireKeys("user"))
            assert(userResponse.username == user.username)
            assert(userResponse.email == user.email)
            assert(userResponse.token.isNotBlank())

            Header("Authorization", listOf("Token ${userResponse.token}"))
        }

        val settings = HttpClientSettings(
            client.settings.baseUrl,
            client.settings.contentType,
            headers = HttpFields(header)
        )
        val userClient = HttpClient(JettyClientAdapter(), client.settings.baseUrl, settings)
        return RealWorldClient(userClient)
    }

    fun initializeUser(user: User): RealWorldClient {
        deleteUser(user)
        registerUser(user)
        return loginUser(user)
    }

    fun getUser(user: User) {
        getUser(user) {
            assert(status == OK)
            assert(contentType == contentType)

            val userResponse = UserResponse(bodyMap())
            assert(userResponse.username == user.username)
            assert(userResponse.email == user.email)
            assert(userResponse.token.isNotBlank())
        }
    }

    fun getUser(user: User, callback: HttpClientResponse.(User) -> Unit) {
        client.get("/user").apply { callback(user) }
    }

    fun updateUser(user: User, updateRequest: PutUserRequest) {
        updateUser(user, updateRequest) {
            assert(status == OK)
            assert(contentType == contentType)

            val userResponse = UserResponse(bodyMap())
            assert(userResponse.username == user.username)
            assert(userResponse.email == (updateRequest.email ?: user.email))
            assert(userResponse.token.isNotBlank())
        }
    }

    fun updateUser(user: User, updateRequest: PutUserRequest, callback: HttpClientResponse.(User) -> Unit) {
        client.put("/user", mapOf("user" to updateRequest)).apply { callback(user) }
    }

    fun getProfile(user: User, following: Boolean) {
        client.get("/profiles/${user.username}").apply {
            assert(status == OK)
            assert(contentType == contentType)

            val profileResponse = ProfileResponse(bodyMap())
            assert(profileResponse.username == user.username)
            assert(profileResponse.following == following)
        }
    }

    fun followProfile(user: User, follow: Boolean) {
        val url = "/profiles/${user.username}/follow"
        val response = if (follow) client.post(url) else client.delete(url)

        response.apply {
            assert(status == OK)
            assert(contentType == contentType)

            val profileResponse = ProfileResponse(bodyMap())
            assert(profileResponse.username == user.username)
            assert(profileResponse.following == follow)
        }
    }

    fun postArticle(article: Article) {
        client.post("/articles", article.toCreationRequest()).apply {
            assert(status == OK)
            assert(contentType == contentType)

            val postArticleResponse = ArticleCreationResponse(bodyMap().requireKeys("article"))
            assert(postArticleResponse.body == article.body)
            assert(postArticleResponse.slug == article.slug)
            assert(postArticleResponse.description == article.description)
            assert(!postArticleResponse.favorited)
            assert(postArticleResponse.favoritesCount == 0)
        }
    }

    fun getArticle(slug: String) {
        client.get("/articles/$slug").apply {
            assert(status == OK)
            assert(contentType == contentType)

            val getArticleResponse = ArticleResponse(bodyMap().requireKeys("article"))
            assert(getArticleResponse.slug == slug)
        }
    }

    fun deleteArticle(slug: String) {
        client.delete("/articles/$slug").apply {
            assert(status in setOf(OK, NOT_FOUND))
            assert(contentType == contentType)

            if (status == OK)
                assert(OkResponse(bodyMap().requireKeys("message")).message == "Article $slug deleted")
            else
                assert(ErrorResponse(bodyMap().requireKeys("errors", "body")).body.first() == "Article $slug not found")
        }
    }

    fun updateArticle(article: Article, updateRequest: PutArticleRequest) {
        client.put("/articles/${article.slug}", mapOf("article" to updateRequest)).apply {
            assert(status == OK)
            assert(contentType == contentType)

            val responseArticle = ArticleCreationResponse(bodyMap().requireKeys("article"))
            assert(responseArticle.slug == article.slug)
            assert(responseArticle.title == (updateRequest.title ?: article.title))
            assert(responseArticle.description == (updateRequest.description ?: article.description))
            assert(responseArticle.body == (updateRequest.body ?: article.body))
        }
    }

    fun getFeed(vararg articles: Article) {
        client.get("/articles/feed").apply {
            assert(status == OK)
            assert(contentType == contentType)

            val feedArticles = bodyMap().requireKeys<List<Map<*, *>>>("articles").map { ArticleResponse(it) }
            val feedResponse = ArticlesResponseRoot(feedArticles, articles.size.toLong())
            assert(feedResponse.articlesCount >= feedResponse.articles.size)
            assert(feedResponse.articles.size == articles.size)
            assert(feedResponse.articles.all {
                it.slug in articles.map { article -> article.slug }
            })
        }
    }

    fun favoriteArticle(article: Article, favorite: Boolean) {
        val url = "/articles/${article.slug}/favorite"
        val response = if (favorite) client.post(url) else client.delete(url)

        response.apply {
            assert(status == OK)
            assert(contentType == contentType)

            val profileResponse = ArticleResponse(bodyMap().requireKeys("article"))
            assert(profileResponse.favorited == favorite)
        }
    }

    fun findArticles(
        author: String? = null,
        favorited: String? = null,
        tag: String? = null,
        expected: Set<Article> = emptySet()) {

        val slugs = expected.map { it.slug }

        findArticles(author, favorited, tag).apply {
            assert(size == slugs.size)
            assert(map { it.slug }.containsAll(slugs))
        }
    }

    fun createComment(article: String, comment: CommentRequest) {
        client.post("/articles/$article/comments", mapOf("comment" to comment)).apply {
            assert(status in setOf(OK, NOT_FOUND))
            assert(contentType == contentType)

            if (status == OK) {
                val commentsResponse = CommentResponse(bodyMap().requireKeys("comment"))
                assert(commentsResponse.body == comment.body)
            }
            else if (status == NOT_FOUND) {
                val commentsResponse = ErrorResponse(bodyMap().requireKeys("errors", "body"))
                assert(commentsResponse.body.first() == "$article article not found")
            }
        }
    }

    fun deleteComment(article: String, id: Int) {
        client.delete("/articles/$article/comments/$id").apply {
            assert(status == OK)
            assert(contentType == contentType)
            assert(OkResponse(bodyMap().requireKeys("message")).message == "$id deleted")
        }
    }

    fun getComments(article: String, vararg ids: Int) {
        client.get("/articles/$article/comments").apply {
            assert(status == OK)
            assert(contentType == contentType)

            val commentsResponse = bodyMap().requireKeys<List<Map<*, *>>>("comments").map { CommentResponse(it) }
            assert(commentsResponse.size == ids.size)
            assert(commentsResponse.map { it.id }.containsAll(ids.toSet()))
        }
    }

    fun getTags(vararg expectedTags: String) {
        client.get("/tags").apply {
            assert(status == OK)
            assert(contentType == contentType)

            val tags = bodyMap().requireKeys<Collection<String>>("tags")
            assert(tags.size == expectedTags.size)
            assert(tags.containsAll(expectedTags.toSet()))
        }
    }

    private fun findArticles(
        author: String? = null,
        favorited: String? = null,
        tag: String? = null): List<ArticleResponse> {

        val queryString = mapOf("author" to author, "favorited" to favorited, "tag" to tag)
            .filterValues { it?.isNotBlank() ?: false }
            .map { it.key + "=" + it.value }
            .joinToString("&", "?")

        client.get("/articles$queryString").apply {
            assert(status == OK)
            assert(contentType == contentType)

            val articles = bodyMap().requireKeys<List<Map<*, *>>>("articles").map { ArticleResponse(it) }
            val articlesRoot = ArticlesResponseRoot(articles, articles.size.toLong())
            assert(articlesRoot.articlesCount >= 0)
            return articles
        }
    }
}
