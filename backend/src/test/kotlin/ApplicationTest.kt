package com.hexagonkt.realworld

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.hexagonkt.helpers.Resource
import com.hexagonkt.http.client.Client
import com.hexagonkt.serialization.Json
import com.hexagonkt.serialization.parse
import org.junit.After
import org.junit.Before
import org.junit.Test

class ApplicationTest {
    private val client: Client by lazy { Client("http://localhost:${server.runtimePort}/api") }

    @Before fun startup() {
        main()
    }

    @After fun shutdown() {
        server.stop()
    }

    @Test fun `Register user returns the created user`() {
        client.delete("/users/jake")

        val body = WrappedUsersPostRequest(UsersPostRequest("jake@jake.jake", "jake", "jakejake"))
        val response = client.post("/users", body, Json.contentType)
        val content = response.responseBody.parse(WrappedUsersPostResponse::class, Json)

        assert(response.statusCode == 200)
        assert(response.contentType == "${Json.contentType};charset=utf-8")
        assert(content.user.email == "jake@jake.jake")
        assert(content.user.username == "jake")
    }

    @Test fun `Login correct user returns a token`() {
        `Register user returns the created user`()
        client.post("/users/login")
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
