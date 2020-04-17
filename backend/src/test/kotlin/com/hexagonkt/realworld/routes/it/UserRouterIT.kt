package com.hexagonkt.realworld.routes.it

import com.hexagonkt.http.client.Client
import com.hexagonkt.http.client.ClientSettings
import com.hexagonkt.http.client.ahc.AhcAdapter
import com.hexagonkt.realworld.RealWorldClient
import com.hexagonkt.realworld.main
import com.hexagonkt.realworld.messages.ErrorResponseRoot
import com.hexagonkt.realworld.messages.PutUserRequest
import com.hexagonkt.realworld.server
import com.hexagonkt.serialization.Json
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
        val endpoint = "http://localhost:${server.runtimePort}/api"
        val settings = ClientSettings(Json.contentType)
        val client = RealWorldClient(Client(AhcAdapter(), endpoint, settings))

        val jakeClient = client.initializeUser(jake)

        jakeClient.getUser(jake)
        jakeClient.updateUser(jake, PutUserRequest(email = jake.email))
        jakeClient.updateUser(jake, PutUserRequest(email = "changed.${jake.email}"))

        client.getUser(jake) {
            val parsedBody = body?.parse<ErrorResponseRoot>()?: error("Body expected")
            assert(status == 401)
            assert(contentType == "${Json.contentType};charset=utf-8")
            assert(parsedBody.errors.body.isNotEmpty())
            assert(parsedBody.errors.body.first() == "Unauthorized")
        }

        client.updateUser(jake, PutUserRequest(email = jake.email)) {
            val parsedBody = body?.parse<ErrorResponseRoot>()?: error("Body expected")
            assert(status == 401)
            assert(contentType == "${Json.contentType};charset=utf-8")
            assert(parsedBody.errors.body.isNotEmpty())
        }
    }
}
