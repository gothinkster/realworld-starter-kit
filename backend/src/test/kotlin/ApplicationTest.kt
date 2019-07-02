package com.hexagonkt.realworld

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
        val body = WrappedUsersPostRequest(UsersPostRequest("jake@jake.jake", "jake", "jakejake"))
        val response = client.post("/users", body, Json.contentType)
        val content = response.responseBody.parse(WrappedUsersPostResponse::class, Json)

        assert(response.statusCode == 200)
        assert(response.contentType == "${Json.contentType};charset=utf-8")
        assert(content.user.email == "jake@jake.jake")
        assert(content.user.username == "jake")
    }

    @Test fun `OPTIONS returns correct CORS headers`() {
        val response = client.options("/interconnections")
        assert(response.statusCode == 204)
        assert(response.headers["Access-Control-Allow-Origin"] == "*")
        assert(response.headers["Access-Control-Allow-Headers"] == "Accept,User-Agent,Host")
    }
}
