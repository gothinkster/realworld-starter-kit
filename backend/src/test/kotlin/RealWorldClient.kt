package com.hexagonkt.realworld

import com.hexagonkt.http.client.Client
import com.hexagonkt.realworld.messages.*
import com.hexagonkt.serialization.Json
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.parse
import org.asynchttpclient.Response

internal class RealWorldClient(val client: Client) {

    private fun User.toRegistrationRequest(): RegistrationRequestRoot =
        RegistrationRequestRoot(RegistrationRequest(email, username, password))

    private fun User.toLoginRequest(): LoginRequestRoot =
        LoginRequestRoot(LoginRequest(email, password))

    private fun Article.toCreationRequest(): ArticleRequestRoot =
        ArticleRequestRoot(ArticleRequest(title, description, body, tagList))

    fun deleteUser(user: User, allowedCodes: Set<Int> = setOf(200, 404)) {
        client.delete("/users/${user.username}") { assert(statusCode in allowedCodes) }
    }

    fun registerUser(user: User) {
        registerUser(user) {
            assert(statusCode == 201)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == user.email)
            assert(userResponse.user.token.isNotBlank())
        }
    }

    fun registerUser(user: User, callback: Response.() -> Unit) {
        client.post("/users", user.toRegistrationRequest()).apply(callback)
    }

    fun loginUser(user: User): RealWorldClient {
        val headers = client.post("/users/login", user.toLoginRequest()).let {
            assert(it.statusCode == 200)
            assert(it.contentType == "${Json.contentType};charset=utf-8")

            val userResponse = it.responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == user.email)
            assert(userResponse.user.token.isNotBlank())

            mapOf("Authorization" to listOf("Token ${userResponse.user.token}"))
        }

        return RealWorldClient(Client(client.endpoint, client.contentType, headers = headers))
    }

    fun initializeUser(user: User): RealWorldClient {
        deleteUser(user)
        registerUser(user)
        return loginUser(user)
    }

    fun getUser(user: User) {
        getUser(user) {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == user.email)
            assert(userResponse.user.token.isNotBlank())
        }
    }

    fun getUser(user: User, callback: Response.(User) -> Unit) {
        client.get("/user") { callback(user) }
    }

    fun updateUser(user: User, updateUserRequest: PutUserRequest) {
        updateUser(user, updateUserRequest) {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == updateUserRequest.email ?: user.email)
            assert(userResponse.user.token.isNotBlank())
        }
    }

    fun updateUser(user: User, updateUser: PutUserRequest, callback: Response.(User) -> Unit) {
        client.put("/user", PutUserRequestRoot(updateUser)) { callback(user) }
    }

    fun getProfile(user: User, following: Boolean) {
        client.get("/profiles/${user.username}") {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val profileResponse = responseBody.parse(ProfileResponseRoot::class)
            assert(profileResponse.profile.username == user.username)
            assert(profileResponse.profile.following == following)
        }
    }

    fun followProfile(user: User, follow: Boolean) {
        val url = "/profiles/${user.username}/follow"
        val response = if (follow) client.post(url) else client.delete(url)

        response.apply {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val profileResponse = responseBody.parse(ProfileResponseRoot::class)
            assert(profileResponse.profile.username == user.username)
            assert(profileResponse.profile.following == follow)
        }
    }

    fun postArticle(article: Article) {
        client.post("/articles", article.toCreationRequest()) {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")
        }
    }

    fun getArticle(slug: String) {
        client.get("/articles/$slug") {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")
        }
    }

    fun deleteArticle(slug: String) {
        client.delete("/articles/$slug") { assert(statusCode in setOf(200, 404)) }
    }
}
