package com.hexagonkt.realworld

import com.hexagonkt.helpers.Resource
import com.hexagonkt.http.client.Client
import com.hexagonkt.serialization.Json
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.routes.*
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.parse
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
        image = URL("http://example.org") // TODO set place holder image
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

    @Test fun `Smoke tests`() {
        lateinit var jakeClient: Client

        client.delete("/users/jake").apply {
            assert(statusCode == 200)
        }

        client.post("/users", jake.toRegistrationRequest()).apply {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.email == "jake@jake.jake")
            assert(userResponse.user.username == "jake")
            assert(userResponse.user.token.isNotBlank())

            val headers = mapOf("Authorization" to listOf("Token ${userResponse.user.token}"))
            jakeClient = Client(client.endpoint, client.contentType, headers = headers)
        }

        client.post("/users/login", jake.toLoginRequest()).apply {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.email == "jake@jake.jake")
            assert(userResponse.user.username == "jake")
            assert(userResponse.user.token.isNotBlank())
        }

        jakeClient.get("/user").apply {
            assert(statusCode == 200)
            assert(contentType == "${Json.contentType};charset=utf-8")

            val userResponse = responseBody.parse(UserResponseRoot::class)
            assert(userResponse.user.email == "jake@jake.jake")
            assert(userResponse.user.username == "jake")
            assert(userResponse.user.token.isNotBlank())
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
