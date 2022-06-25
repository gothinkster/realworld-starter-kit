package com.hexagonkt.realworld.routes.it

import com.hexagonkt.core.media.ApplicationMedia
import com.hexagonkt.http.client.HttpClient
import com.hexagonkt.http.client.HttpClientSettings
import com.hexagonkt.http.client.jetty.JettyClientAdapter
import com.hexagonkt.http.model.ClientErrorStatus
import com.hexagonkt.http.model.ClientErrorStatus.UNAUTHORIZED
import com.hexagonkt.http.model.ContentType
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.messages.ErrorResponseRoot
import com.hexagonkt.realworld.messages.PutUserRequest
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.jackson.json.Json
import com.hexagonkt.realworld.services.User
import com.hexagonkt.serialization.parse
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle.PER_CLASS
import java.net.URL

@TestInstance(PER_CLASS)
class UserRouterIT {

    private val jake = User(
        username = "jake",
        email = "jake@jake.jake",
        password = "jakejake",
        bio = "I work at statefarm",
        image = URL("https://i.pravatar.cc/150?img=3")
    )

    @BeforeAll fun startup() {
        main()
    }

    @AfterAll fun shutdown() {
        server.stop()
    }

    @Test fun `Get and update current user`() {
        val endpoint = URL("http://localhost:${server.runtimePort}/api")
        val settings = HttpClientSettings(endpoint, ContentType(ApplicationMedia.JSON))
        val client = RealWorldClient(HttpClient(JettyClientAdapter(), settings))

        val jakeClient = client.initializeUser(jake)

        jakeClient.getUser(jake)
        jakeClient.updateUser(jake, PutUserRequest(email = jake.email))
        jakeClient.updateUser(jake, PutUserRequest(email = "changed.${jake.email}"))

        client.getUser(jake) {
            val parsedBody = body?.parse<ErrorResponseRoot>()?: error("Body expected")
            assert(status == UNAUTHORIZED)
            assert(contentType == "${Json.contentType};charset=utf-8")
            assert(parsedBody.errors.body.isNotEmpty())
            assert(parsedBody.errors.body.first() == "Unauthorized")
        }

        client.updateUser(jake, PutUserRequest(email = jake.email)) {
            val parsedBody = body?.parse<ErrorResponseRoot>()?: error("Body expected")
            assert(status == UNAUTHORIZED)
            assert(contentType == "${Json.contentType};charset=utf-8")
            assert(parsedBody.errors.body.isNotEmpty())
        }
    }
}
