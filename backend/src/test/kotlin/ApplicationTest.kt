package com.hexagonkt.realworld

import com.hexagonkt.helpers.Resource
import com.hexagonkt.http.client.Client
import com.hexagonkt.serialization.Json
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.routes.*
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

    private fun User.toRegistrationRequest(): RegistrationRequestRoot =
        RegistrationRequestRoot(RegistrationRequest(email, username, password))

    private fun User.toLoginRequest(): LoginRequestRoot =
        LoginRequestRoot(LoginRequest(email, password))

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

    @Test fun `Smoke test`() {
        deleteUser(jake)
        deleteUser(jane)

        registerUser(jake)
        registerUser(jane)
//        registerUser(jane) { assert(statusCode == 400) }

        val jakeClient = loginUser(jake)
        val janeClient = loginUser(jane)

        getUser(jakeClient, jake)
        getUser(janeClient, jane)

        updateUser(jakeClient, jake, PutUserRequest(email = jake.email))
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
