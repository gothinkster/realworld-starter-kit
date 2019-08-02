package com.hexagonkt.realworld

import com.hexagonkt.helpers.Resource
import com.hexagonkt.http.client.Client
import com.hexagonkt.serialization.Json
import com.hexagonkt.serialization.parse
import com.hexagonkt.realworld.rest.Jwt
import com.hexagonkt.realworld.routes.*
import org.junit.*

class ApplicationTest {
    private val client: Client by lazy { Client("http://localhost:${server.runtimePort}/api") }

    companion object {
        @BeforeClass @JvmStatic fun startup() {
            main()
        }

        @AfterClass @JvmStatic fun shutdown() {
            server.stop()
        }
    }

    private lateinit var token: String

    private fun authorization(): Map<String, List<String>> =
        mapOf("Authorization" to listOf("Token $token"))

    @Test fun `Register user returns the created user`() {
        assert(client.delete("/users/jake").statusCode == 200)

        val body = WrappedRegistrationRequest(RegistrationRequest("jake@jake.jake", "jake", "jakejake"))
        val response = client.post("/users", body, Json.contentType)
        val content = response.responseBody.parse(WrappedUserResponse::class, Json)

        assert(response.statusCode == 200)
        assert(response.contentType == "${Json.contentType};charset=utf-8")
        assert(content.user.email == "jake@jake.jake")
        assert(content.user.username == "jake")
        assert(content.user.token.isNotBlank())

        token = content.user.token
    }

    @Test fun `Login correct user returns a token`() {
        `Register user returns the created user`()

        val body = WrappedLoginRequest(LoginRequest("jake@jake.jake", "jakejake"))
        val response = client.post("/users/login", body, Json.contentType)
        val content = response.responseBody.parse(WrappedUserResponse::class, Json)

        assert(response.statusCode == 200)
        assert(response.contentType == "${Json.contentType};charset=utf-8")
        assert(content.user.email == "jake@jake.jake")
        assert(content.user.username == "jake")
        assert(content.user.token.isNotBlank())

        token = content.user.token
    }

    @Test fun `Get current user returns the logged user`() {
        `Login correct user returns a token`()

        val response = client.get("/user", authorization())
        val content = response.responseBody.parse(WrappedUserResponse::class, Json)

        assert(response.statusCode == 200)
        assert(response.contentType == "${Json.contentType};charset=utf-8")
        assert(content.user.email == "jake@jake.jake")
        assert(content.user.username == "jake")
        assert(content.user.token.isNotBlank())

        token = content.user.token
    }

    @Test fun `OPTIONS returns correct CORS headers`() {
        val response = client.options("/interconnections")
        assert(response.statusCode == 204)
        assert(response.headers["Access-Control-Allow-Origin"] == "*")
        assert(response.headers["Access-Control-Allow-Headers"] == "Accept,User-Agent,Host")
    }

    @Test fun `JWT creation and parsing`() {
        val jwt = Jwt(Resource("keystore.p12"), "storepass", "realWorld")
        val token = jwt.sign("subject")

        assert(jwt.verify(token).subject == "subject")
    }
}
