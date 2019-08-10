package com.hexagonkt.realworld

import com.hexagonkt.helpers.Resource
import com.hexagonkt.http.client.Client
import com.hexagonkt.serialization.Json
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.routes.*
import com.hexagonkt.realworld.services.Article
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.parse
import org.asynchttpclient.Response
import org.junit.*
import java.net.URL

class ApplicationTest {
    private val client by lazy {
        Client("http://localhost:${server.runtimePort}/api", Json.contentType)
    }

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

    private fun User.toRegistrationRequest(): RegistrationRequestRoot =
        RegistrationRequestRoot(RegistrationRequest(email, username, password))

    private fun User.toLoginRequest(): LoginRequestRoot =
        LoginRequestRoot(LoginRequest(email, password))

    private fun Article.toCreationRequest(): ArticleRequestRoot =
        ArticleRequestRoot(ArticleRequest(title, description, body, tagList))

    companion object {
        @BeforeClass @JvmStatic fun startup() {
            main()
        }

        @AfterClass @JvmStatic fun shutdown() {
            server.stop()
        }
    }

    private fun deleteUser(user: User) {
        client.delete("/users/${user.username}").apply { assert(statusCode in setOf(200, 404)) }
    }

    private fun registerUser(user: User) {
        registerUser(user) {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == user.email)
            assert(userResponse.user.token.isNotBlank())
        }
    }

    private fun registerUser(user: User, callback: Response.() -> Unit) {
        client.post("/users", user.toRegistrationRequest()).apply(callback)
    }

    private fun loginUser(user: User): Client {
        val headers = client.post("/users/login", user.toLoginRequest()).let {
            assert(it.statusCode == 200)
            assert(it.contentType == "${Json.contentType};charset=utf-8")

            val userResponse = it.responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == user.email)
            assert(userResponse.user.token.isNotBlank())

            mapOf("Authorization" to listOf("Token ${userResponse.user.token}"))
        }

        return Client(client.endpoint, client.contentType, headers = headers)
    }

    private fun getUser(userClient: Client, user: User) {
        userClient.get("/user").apply {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == user.email)
            assert(userResponse.user.token.isNotBlank())
        }
    }

    private fun updateUser(userClient: Client, user: User, updateUser: PutUserRequest) {
        userClient.put("/user", PutUserRequestRoot(updateUser)).apply {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.username == user.username)
            assert(userResponse.user.email == updateUser.email ?: user.email)
            assert(userResponse.user.token.isNotBlank())
        }
    }

    private fun getProfile(userClient: Client, user: User, following: Boolean) {
        userClient.get("/profiles/${user.username}").apply {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val profileResponse = responseBody.parse(ProfileResponseRoot::class)
            assert(profileResponse.profile.username == user.username)
            assert(profileResponse.profile.following == following)
        }
    }

    private fun followProfile(userClient: Client, user: User, follow: Boolean) {
        val url = "/profiles/${user.username}/follow"
        val response = if (follow) userClient.post(url) else userClient.delete(url)

        response.apply {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val profileResponse = responseBody.parse(ProfileResponseRoot::class)
            assert(profileResponse.profile.username == user.username)
            assert(profileResponse.profile.following == follow)
        }
    }

    @Test fun `Smoke test`() {
        deleteUser(jake)
        deleteUser(jane)

        registerUser(jake)
        registerUser(jane)

        registerUser(jane) {
            assert(statusCode == 500)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val errorResponse = responseBody.parse(ErrorResponseRoot::class)
            val exceptionName = "MongoWriteException"
            val message = "E11000 duplicate key error collection: real_world.User index"
            val key = """_id_ dup key: { _id: "${jane.username}" }"""
            assert(errorResponse.errors.body.first() == "$exceptionName: $message: $key")
        }

        val jakeClient = loginUser(jake)
        val janeClient = loginUser(jane)

        getUser(jakeClient, jake)
        getUser(janeClient, jane)

        updateUser(janeClient, jane, PutUserRequest(email = "changed.${jane.email}"))
        updateUser(jakeClient, jake, PutUserRequest(email = jake.email))

        getProfile(jakeClient, jane, false)
        followProfile(jakeClient, jane, true)
        getProfile(jakeClient, jane, true)
        followProfile(jakeClient, jane, false)
        getProfile(jakeClient, jane, false)

        jakeClient.delete("/articles/${trainDragon.slug}").apply {
            assert(statusCode in setOf(200, 404))
        }

        jakeClient.post("/articles", trainDragon.toCreationRequest()).apply {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")
        }

        jakeClient.get("/articles/${trainDragon.slug}").apply {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")
        }
    }

    @Test fun `OPTIONS returns correct CORS headers`() {
        val client = Client("http://localhost:${server.runtimePort}/api", Json.contentType)
        val response = client.options("/tags")
        val corsHeaders = "Accept,User-Agent,Host,Content-Type"

        assert(response.statusCode == 204)
        assert(response.headers["Access-Control-Allow-Origin"] == "*")
        assert(response.headers["Access-Control-Allow-Headers"] == corsHeaders)
    }

    @Test fun `JWT creation and parsing`() {
        val jwt = Jwt(Resource("keystore.p12"), "storepass", "realWorld")
        val token = jwt.sign("subject")

        assert(jwt.verify(token).subject == "subject")
    }
}
