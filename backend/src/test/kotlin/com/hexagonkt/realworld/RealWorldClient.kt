package com.hexagonkt.realworld

import com.hexagonkt.http.client.Client
import com.hexagonkt.http.client.ClientSettings
import com.hexagonkt.http.client.Response
import com.hexagonkt.http.client.ahc.AhcAdapter
import com.hexagonkt.realworld.messages.*
import com.hexagonkt.serialization.json.Json
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.parse

internal class RealWorldClient(val client: Client) {

    private fun User.toRegistrationRequest(): RegistrationRequestRoot =
        RegistrationRequestRoot(RegistrationRequest(email, username, password))

    private fun User.toLoginRequest(): LoginRequestRoot =
        LoginRequestRoot(LoginRequest(email, password))

    private fun Article.toCreationRequest(): ArticleRequestRoot =
        ArticleRequestRoot(ArticleRequest(title, description, body, tagList))

    fun deleteUser(user: User, allowedCodes: Set<Int> = setOf(200, 404)) {
        client.delete("/users/${user.username}").apply {
            assert(status in allowedCodes)
            assert(contentType == "${Json.contentType};charset=utf-8")
        }
    }

    fun registerUser(user: User) {
        registerUser(user) {
            assert(status == 201)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val b = body ?: error("")
            val userResponse = b.parse<UserResponseRoot>()
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == user.email)
            assert(userResponse.user.token.isNotBlank())
        }
    }

    fun registerUser(user: User, callback: Response<String>.() -> Unit) {
        client.post("/users", user.toRegistrationRequest()).apply(callback)
    }

    private fun <T> T?.require(): T =
        this ?: error("The receiver can not be 'null'")

    fun loginUser(user: User): RealWorldClient {
        val headers = client.post("/users/login", user.toLoginRequest()).let {
            assert(it.status == 200)
            assert(it.contentType == "${Json.contentType};charset=utf-8")

            val userResponse = it.body.require().parse<UserResponseRoot>()
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == user.email)
            assert(userResponse.user.token.isNotBlank())

            mapOf("Authorization" to listOf("Token ${userResponse.user.token}"))
        }

        val settings = ClientSettings(client.settings.contentType, headers = headers)
        val userClient = Client(AhcAdapter(), client.endpoint, settings)
        return RealWorldClient(userClient)
    }

    fun initializeUser(user: User): RealWorldClient {
        deleteUser(user)
        registerUser(user)
        return loginUser(user)
    }

    fun getUser(user: User) {
        getUser(user) {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = body.require().parse<UserResponseRoot>()
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == user.email)
            assert(userResponse.user.token.isNotBlank())
        }
    }

    fun getUser(user: User, callback: Response<String>.(User) -> Unit) {
        client.get("/user").apply { callback(user) }
    }

    fun updateUser(user: User, updateRequest: PutUserRequest) {
        updateUser(user, updateRequest) {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = body.require().parse<UserResponseRoot>()
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == updateRequest.email ?: user.email)
            assert(userResponse.user.token.isNotBlank())
        }
    }

    fun updateUser(user: User, updateRequest: PutUserRequest, callback: Response<String>.(User) -> Unit) {
        client.put("/user", PutUserRequestRoot(updateRequest)).apply { callback(user) }
    }

    fun getProfile(user: User, following: Boolean) {
        client.get("/profiles/${user.username}").apply {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val profileResponse = body.require().parse<ProfileResponseRoot>()
            assert(profileResponse.profile.username == user.username)
            assert(profileResponse.profile.following == following)
        }
    }

    fun followProfile(user: User, follow: Boolean) {
        val url = "/profiles/${user.username}/follow"
        val response = if (follow) client.post(url) else client.delete(url)

        response.apply {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val profileResponse = body.require().parse<ProfileResponseRoot>()
            assert(profileResponse.profile.username == user.username)
            assert(profileResponse.profile.following == follow)
        }
    }

    fun postArticle(article: Article) {
        client.post("/articles", article.toCreationRequest()).apply {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val postArticleResponse = body.require().parse<ArticleCreationResponseRoot>()
            assert(postArticleResponse.article.body == article.body)
            assert(postArticleResponse.article.slug == article.slug)
            assert(postArticleResponse.article.description == article.description)
            assert(!postArticleResponse.article.favorited)
            assert(postArticleResponse.article.favoritesCount == 0)
        }
    }

    fun getArticle(slug: String) {
        client.get("/articles/$slug").apply {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val getArticleResponse = body.require().parse<ArticleResponseRoot>()
            assert(getArticleResponse.article.slug == slug)
        }
    }

    fun deleteArticle(slug: String) {
        client.delete("/articles/$slug").apply {
            assert(status in setOf(200, 404))
            assert(contentType == "${Json.contentType};charset=utf-8")

            if (status == 200)
                assert(body.require().parse<OkResponse>().message == "Article $slug deleted")
            else
                assert(body.require().parse<ErrorResponseRoot>().errors.body.first() == "Article $slug not found")
        }
    }

    fun updateArticle(article: Article, updateRequest: PutArticleRequest) {
        client.put("/articles/${article.slug}", PutArticleRequestRoot(updateRequest)).apply {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val articleResponse = body.require().parse<ArticleCreationResponseRoot>()
            val responseArticle = articleResponse.article
            assert(responseArticle.slug == article.slug)
            assert(responseArticle.title == updateRequest.title ?: article.title)
            assert(responseArticle.description == updateRequest.description ?: article.description)
            assert(responseArticle.body == updateRequest.body ?: article.body)
        }
    }

    fun getFeed(vararg articles: Article) {
        client.get("/articles/feed").apply {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val feedResponse = body.require().parse<ArticlesResponseRoot>()
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
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val profileResponse = body.require().parse<ArticleResponseRoot>()
            assert(profileResponse.article.favorited == favorite)
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
        client.post("/articles/$article/comments", CommentRequestRoot(comment)).apply {
            assert(status in setOf(200, 404))
            assert(contentType == "${Json.contentType};charset=utf-8")

            if (status == 200) {
                val commentsResponse = body.require().parse(CommentResponseRoot::class)
                assert(commentsResponse.comment.body == comment.body)
            }
            else if (status == 404) {
                val commentsResponse = body.require().parse<ErrorResponseRoot>()
                assert(commentsResponse.errors.body.first() == "$article article not found")
            }
        }
    }

    fun deleteComment(article: String, id: Int) {
        client.delete("/articles/$article/comments/$id").apply {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")
            assert(body.require().parse<OkResponse>().message == "$id deleted")
        }
    }

    fun getComments(article: String, vararg ids: Int) {
        client.get("/articles/$article/comments").apply {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val commentsResponse = body.require().parse(CommentsResponseRoot::class)
            assert(commentsResponse.comments.size == ids.size)
            assert(commentsResponse.comments.map { it.id }.containsAll(ids.toSet()))
        }
    }

    fun getTags(vararg expectedTags: String) {
        client.get("/tags").apply {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val tagsResponse = body.require().parse(TagsResponseRoot::class)
            assert(tagsResponse.tags.size == expectedTags.size)
            assert(tagsResponse.tags.containsAll(expectedTags.toSet()))
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

        val response = client.get("/articles$queryString").apply {
            assert(status == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val articles = body.require().parse<ArticlesResponseRoot>()
            assert(articles.articlesCount >= 0)
        }

        return response.body.require().parse<ArticlesResponseRoot>().articles
    }
}
